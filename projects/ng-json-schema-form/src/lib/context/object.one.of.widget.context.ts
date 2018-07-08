import {WidgetContext} from '../core/widget.context';
import {FormControl} from '@angular/forms';
import {SchemaParser} from '../core/schema.parser';

export class ObjectOneOfWidgetContext extends WidgetContext<any> {
  public typeCtrl: FormControl;
  public typeSchema: any;

  private parser: SchemaParser;

  /**
   * Initializes the oneOf selector and creates a new form group
   * to hold all the child contexts.
   */
  public initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Don't want model to begin with {$: {}}
      if (this.path === '$') {
        this.createFormGroup({});
        resolve(true);
        return;
      }

      // New parser
      this.parser = new SchemaParser(this.state);

      // Create a control for this object
      this.typeCtrl = this.state.fb.control({});

      // Create form group
      const ctrl = this.state.fb.group(this.model || {});
      const controls = {};
      controls[this.groupId] = ctrl;
      this.createFormGroup(controls, ctrl);

      // Apply schema from model
      this.applyInitialSchema()
        .then(() => {
          // Monitor for oneOf selection
          this.watchSelector();

          resolve(true);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  public updateModel(model: any): void {
    // Update model
    this.model = model;

    // Remove controls and contexts
    this.removeAllChildren();

    // Find matching schema
    this.typeSchema = this.findSchema();

    // Update control
    this.typeCtrl.setValue(this.typeSchema);

    // Parse matching schema
    this.parser.parse(this.typeSchema, {}, false, this.path)
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * Watches the definition selector and swaps out the child contexts.
   */
  private watchSelector() {
    this.typeCtrl.valueChanges.subscribe(type => {
      // Set new schema
      this.typeSchema = type;
      // Remove existing controls and create new children
      if (this.typeSchema) {
        console.log('schema', this.typeSchema);
        // Remove controls and contexts
        this.removeAllChildren();
        // Parse new schema with this context as parent
        this.parser.parse(this.typeSchema, {}, true, this.path)
          .catch(err => {
            console.error(err);
          });
      } else {
        console.warn('schema not found for selection');
      }
    });
  }

  /**
   * Applies initial state from the model by locating the matching schema
   * and applying it.
   */
  private applyInitialSchema(): Promise<boolean> {
    const schema = this.findSchema();

    return new Promise<boolean>((resolve, reject) => {
      if (schema) {
        this.parser.parse(schema, this.model, false, this.path).then(() => {
          this.typeCtrl.setValue(schema, {emitEvent: false});
          resolve(true);
        }).catch(err => {
          console.error(err);
          reject(err);
        });
      } else {
        resolve(false);
      }
    });
  }
}
