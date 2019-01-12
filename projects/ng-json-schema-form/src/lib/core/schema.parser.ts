import * as ss from 'schemasaurus';
import * as jsrp from 'json-schema-ref-parser/dist/ref-parser';
import {WidgetContext} from './widget.context';
import {FormState} from './form.state';

/**
 * Parses a json schema and generates a context tree.
 *
 * @author Wael Jammal
 */
export class SchemaParser {
  constructor(protected state: FormState) {

  }

  /**
   * Parse the given schema.
   *
   * @param schemaPart Json Schema
   * @param model Initial model
   * @param emit True to emit a change event
   * @param rootPath Allows overriding the root path (default $)
   * @param pathPrefix Allows post prefixing paths something.?
   * @param pathPostfix Allows post fixing paths .0, .1 etc.
   * @param update True to allow model updates
   */
  public parse(schemaPart: any,
               model: any = {},
               emit: boolean = true,
               pathPrefix = null,
               pathPostfix = null,
               rootPath = '$',
               update: boolean = false): Promise<WidgetContext<any>> {
    rootPath = rootPath.replace('$.', '');

    if (pathPrefix) {
      pathPrefix = pathPrefix.replace('$.', '');
    }

    if (pathPostfix) {
      pathPostfix = pathPostfix.replace('$.', '');
    }

    return new Promise<WidgetContext<any>>((resolve, reject) => {
      const refParser = new jsrp();

      if (!schemaPart) {
        resolve(null);
        return;
      }

      refParser.dereference(schemaPart)
        .then((parsedSchema) => {
          // console.log('generate form', rootPath);

          const queue = {};
          const handlers = {};
          const promises = [];
          const s = this.state;

          let generator: any;

          // Disable event emitter
          s.emitChangeEvent = false;

          // Map widget type and queue the creation
          s.wr.getSupportedTyped().map(type => {
            handlers[type] = (schema, object, ctx) => {
              let pathParts = [];

              if (ctx.path.length === 0) {
                pathParts.push(rootPath);
              }
              if (pathPrefix) {
                pathParts.push(pathPrefix);
              }
              if (ctx.path.length > 0) {
                pathParts = [...pathParts, ...ctx.path];
              }
              if (pathPostfix) {
                pathParts.push(pathPostfix);
              }

              const path = `${pathParts.join('.').replace('$.', '')}`;
              queue[path] = {schema: schema, object: object, ctx: ctx, parts: [...pathParts], path: path, type: type};
            };
          });

          // Runs once mapping is complete and generates the form contexts
          handlers['end'] = () => {
            let root: WidgetContext<any> = s.rootContext;

            // Process the context queue
            for (const path in queue) {
              if (queue.hasOwnProperty(path)) {
                const entry = queue[path], pathParts = entry.parts, schema = entry.schema, object = entry.object, type = entry.type;
                let partialPath, parentContext;
                let wCtx = this.findClosestMatch(root, path, [], true);
                const exists = wCtx != null;

                // Create new context for type
                if (wCtx && update) {
                  wCtx.updateModel(object);
                } else {
                  const contextType: any = s.wr.getWidgetType(type).context;

                  // Find parent context
                  partialPath = pathParts[pathParts.length - 2] || rootPath;
                  parentContext = root ? this.findClosestMatch(root, path) : null;

                  // Create context if does not exist
                  if (!exists) {
                    wCtx = new contextType.constructor(s.injector);
                    promises.push(wCtx.doInitInternal(this.state, root, schema, type, parentContext, object, path));
                  }

                  // $ means it's a root context and has no parent
                  if (path === rootPath) {
                    root = wCtx;
                    if (!s.rootContext) {
                      s.rootContext = root;
                    }
                  }

                  // Register child context but never add to itself
                  if (parentContext && !exists) {
                    // console.log('register child', wCtx.path, '->', parentContext.path);
                    parentContext.registerChild(wCtx);
                  }
                }
              }
            }

            Promise.all(promises)
              .then(() => {
                // console.log('generated form', root);
                s.emitChangeEvent = true;

                resolve(root);

                if (emit && root) {
                  setTimeout(() => {
                    root.formGroup.updateValueAndValidity();
                  });
                }
              })
              .catch((err) => {
                console.error(err);
                reject(err);
              });
          };

          const normalize = ss.newNormalizer(parsedSchema);
          generator = ss.newIterator(parsedSchema, () => handlers);
          generator(normalize(model));
        })
        .catch(function (err) {
          console.error(err);
          reject(err);
        });
    });
  }

  /**
   * Recursively find all widget paths.
   *
   * @param root Context to start at
   * @param path Needle to find
   * @param paths Paths cache
   * @param exact True if match should be exact
   */
  private findClosestMatch(root: WidgetContext<any>,
                           path: string,
                           paths: Array<{ path: string, ctx: WidgetContext<any> }> = [],
                           exact: boolean = false): WidgetContext<any> {
    if (!root) {
      return null;
    }

    paths.push({path: '$', ctx: root});

    for (const childContext of root.childContexts) {
      paths.push({path: childContext.path.replace('$.', ''), ctx: childContext});

      if (childContext.childContexts != null && childContext.childContexts.length > 0) {
        this.findClosestMatchRecursive(childContext, paths, exact);
      }
    }

    if (!exact) {
      return this.closestMatch(paths, path);
    } else {
      const match = this.exactMatch(paths, path);
      return match ? match.ctx : null;
    }
  }

  /**
   * Recursively find all widget paths.
   *
   * @param ctx Context to start at
   * @param paths Paths cache
   * @param exact True if match should be exact
   * @param skipRoot True to skip the root context
   */
  private findClosestMatchRecursive(ctx: WidgetContext<any>,
                                    paths: Array<{ path: string; ctx: WidgetContext<any> }>,
                                    exact: boolean,
                                    skipRoot: boolean = true) {
    if (!skipRoot) {
      paths.push({path: ctx.path.replace('$.', ''), ctx: ctx});
    }

    for (const childContext of ctx.childContexts) {
      paths.push({path: childContext.path.replace('$.', ''), ctx: childContext});

      if (childContext.childContexts != null && childContext.childContexts.length > 0) {
        this.findClosestMatchRecursive(childContext, paths, exact);
      }
    }
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Finds the closest matching path.
   *
   * @param a Array of paths
   * @param b Path to match on
   */
  private closestMatch(a: Array<{ path: string; ctx: WidgetContext<any> }>, b: string): WidgetContext<any> {
    let res = 0;
    let score = 0;

    for (const index in a) {
      if (a.hasOwnProperty(index)) {
        const entry = a[index];
        if (b.startsWith(entry.path)) {
          const len = String(entry.path).length;

          if (score < len) {
            res = Number(index);
            score = len;
          }
        }
      }
    }

    return a[res].ctx;
  }

  /**
   * Finds a context entry with an exact match for a path.
   *
   * @param a Entries to search
   * @param b Needle
   */
  private exactMatch(a: Array<{ path: string; ctx: WidgetContext<any> }>, b: string): { path: string; ctx: WidgetContext<any> } {
    return a.find(p => p.path === b);
  }
}
