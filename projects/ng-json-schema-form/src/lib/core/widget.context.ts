import {Context} from './context';
import {FormState} from './form.state';
import {ValidatorFn} from '@angular/forms/src/directives/validators';
import {FormGroup} from '@angular/forms';

/**
 * Base class for all widget contexts.
 *
 * @author Wael Jammal
 */
export abstract class WidgetContext<MT> extends Context<MT> {
  private _parent: Context<MT>;
  private _path: string;
  protected _groupId: string;
  protected _ready: boolean;

  /** Schema path **/
  public get path(): string {
    return this._path;
  }

  /** Parent context **/
  public get parent(): Context<MT> {
    return this._parent;
  }

  /** Form group id **/
  public get groupId(): string {
    return this._groupId;
  }

  /** Ready state **/
  public get ready(): boolean {
    return this._ready;
  }

  /** Returns true if value is required **/
  public get required(): boolean {
    let value = false;

    if (this.root && this.root.schema.required && this.root.schema.required.indexOf(this.groupId) > -1) {
      value = true;
    }

    if (this.schema.required && this.schema.required.indexOf(this.groupId) > -1) {
      value = true;
    }

    return value;
  }

  /** Returns true if widget should be hidden **/
  public get hidden(): boolean {
    return this.schema.hidden || (this.schema.options && this.schema.options.hidden);
  }

  /**
   * Initialize the widget.
   *
   * @param state Holds forms state
   * @param root Root context
   * @param schema Root schema
   * @param type Widget type
   * @param parent Parent context
   * @param object Model
   * @param path Widget path
   */
  public async doInitInternal(state: FormState,
                              root: WidgetContext<MT>,
                              schema: any,
                              type: string,
                              parent: Context<MT>,
                              object: any,
                              path: string): Promise<boolean> {
    super.doInit(state, root, schema, type);

    this._parent = parent;
    this._path = path.startsWith('$') ? path : '$.' + path;
    this._groupId = path.split(/[. ]+/).pop();
    this.model = object;

    return new Promise<boolean>((resolve, reject) => {
      this.initialize().then((result) => {
        resolve(result);
        this._ready = true;
      }).catch(reject);
    });
  }

  /**
   * Aggregates all errors relating to this widget.
   */
  public getAllErrors(): Array<any> {
    const result = [];
    let control;

    if (this.formGroup instanceof FormGroup) {
      const frmGrp: FormGroup = this.formGroup;
      control = frmGrp.controls[this.groupId];
    }

    if (!control) {
      return result;
    }

    const errors = control.errors;

    for (const errorKey in errors) {
      if (errors.hasOwnProperty(errorKey)) {
        result.push({
          key: errorKey,
          value: this.state.wr.getValidatorError(errorKey, this.groupId, this.schema, errors[errorKey]) || errors[errorKey]
        });
      }
    }

    return result;
  }

  /**
   * Find a schema that matches the active model or passed model.
   */
  protected findSchema(model: any = null): any {
    for (const oneOf of this.schema.oneOf) {
      if (this.validator.validate(oneOf, model || this.model)) {
        return oneOf;
      }
    }

    return null;
  }

  /**
   * Returns a list of validators for this widget.
   */
  protected getValidators(): ValidatorFn | ValidatorFn[] {
    const parentSchema = this.parent ? this.parent.schema : {};
    return this.state.wr.getFormValidator(this.schema, parentSchema, this.required);
  }

  /**
   * Destroy.
   */
  protected destroy(): void {

  }
}
