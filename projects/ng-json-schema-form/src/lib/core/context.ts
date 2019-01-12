import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {SchemaValidator} from './schema.validator';
import {WidgetContext} from './widget.context';
import {FormState} from './form.state';

/**
 * Context abstraction.
 *
 * @author Wael Jammal
 */
export abstract class Context<MT> {
  private _formGroup: AbstractControl;
  private _childContexts: Array<WidgetContext<MT>> = [];
  private _valid: boolean;
  private _schema: any;
  private _type: string;
  private _root: WidgetContext<any>;
  private _state: FormState;

  /**
   * The initial data model.
   */
  public model: MT;

  /**
   * Widgets belonging to this parent.
   */
  public get childContexts(): Array<WidgetContext<MT>> {
    return this._childContexts;
  }

  /**
   * Form group representing the entire schema.
   */
  public get formGroup(): AbstractControl {
    return this._formGroup;
  }

  /**
   * Schema part.
   */
  public get schema(): any {
    return this._schema;
  }

  /**
   * Widget type.
   */
  public get type(): string {
    return this._type;
  }

  /**
   * Form state.
   */
  public get state(): FormState {
    return this._state;
  }

  /**
   * Schema validator.
   */
  public get validator(): SchemaValidator {
    return this.state.validator;
  }

  /**
   * Root context.
   */
  public get root(): WidgetContext<any> {
    return this._root;
  }

  /** True if widget is valid **/
  get valid(): boolean {
    return this._valid;
  }

  protected doInit(state: FormState,
                   root: WidgetContext<MT>,
                   schema: any,
                   type: string): void {
    this._schema = schema;
    this._type = type;
    this._root = root;
    this._state = state;
  }

  /**
   * Registers a new child context.
   *
   * @param context Child context
   */
  public registerChild(context: WidgetContext<MT>) {
    this._childContexts.push(context);
  }

  /**
   * Removes all children of this context from both the view and form.
   */
  public removeAllChildren(): void {
    this._childContexts = [];

    if (this.formGroup instanceof FormGroup) {
      const grp: FormGroup = this.formGroup;
      for (const controlsKey in grp.controls) {
        if (grp.controls.hasOwnProperty(controlsKey)) {
          // Delete this way to avoid triggering unnecessary events
          delete grp.controls[controlsKey];
        }
      }
    } else if (this.formGroup instanceof FormArray) {
      const grp: FormArray = this.formGroup;
      for (const index in grp.controls) {
        if (grp.controls[index]) {
          grp.removeAt(Number(index));
        }
      }
    }
  }

  /**
   * Creates a form group.
   *
   * @param controls Controls to add to the group
   * @param overrideGroup If supplied will be set as the form group for this context, use this to add a nested group to a parent while
   * maintaining the correct hierarchy.
   */
  public createFormGroup(controls: { [key: string]: AbstractControl }, overrideGroup?: AbstractControl): AbstractControl {
    if (this.parent) {
      if (this.parent.formGroup instanceof FormGroup) {
        this._formGroup = overrideGroup || this.parent.formGroup;
        const grp: FormGroup = this.parent.formGroup;
        for (const controlKey in controls) {
          if (controls.hasOwnProperty(controlKey)) {
            grp.addControl(controlKey, controls[controlKey]);
          }
        }
      } else if (this.parent.formGroup instanceof FormArray) {
        this._formGroup = overrideGroup || new FormGroup(controls);
        const frmGroup: FormGroup = this._formGroup as FormGroup;
        const grp: FormArray = this.parent.formGroup;
        grp.push(frmGroup);
      }
    } else {
      this._formGroup = new FormGroup(controls);
    }

    return this._formGroup;
  }

  /**
   * Creates a form array.
   *
   * @param controls Controls to add to the group
   */
  public createFormArray(controls: Array<AbstractControl>): AbstractControl {
    if (this.parent) {
      if (this.parent.formGroup instanceof FormGroup) {
        this._formGroup = new FormArray(controls);
        const grp: FormGroup = this.parent.formGroup;
        grp.addControl(this.groupId, this._formGroup);
      }
    } else {
      this._formGroup = new FormArray(controls);
    }

    return this._formGroup;
  }

  /**
   * Destroy widget.
   */
  public doDestroy(): void {
    this.destroy();
  }

  /**
   * Validates the model against the schema and returns errors if any.
   */
  private validate(): void {
    this._valid = this.validator.validate(this.schema, this.model);
  }

  /**
   * Widget path.
   */
  public abstract get path(): string;

  /**
   * Parent widget.
   */
  public abstract get parent(): Context<MT>;

  /**
   * Update the model.
   *
   * @param model New model
   */
  public abstract updateModel(model: any);

  /**
   * Group id identifies the widget field.
   */
  public abstract get groupId(): string;

  /**
   * Initialize the widget.
   */
  public abstract initialize(): Promise<boolean>;

  /**
   * Destroy.
   */
  protected abstract destroy(): void;
}
