import {WidgetContext} from './widget.context';
import {FormatDefinition} from 'ajv';
import {ValidatorFn} from '@angular/forms/src/directives/validators';

export abstract class WidgetRegistry {
  private widgets: { [type: string]: { widget: any, context: WidgetContext<any> } } = {};
  private _formats: { [type: string]: { format: FormatDefinition } } = {};

  /**
   * Default widget to render when none are found
   */
  protected defaultWidget: any;

  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  /**
   * Sets up the registry.
   */
  constructor() {
    this.registerWidgets();
    this.registerFormatters();
  }

  /**
   * Returns custom formats.
   */
  public get formats(): { [type: string]: { format: FormatDefinition } } {
    return Object.assign({}, this._formats);
  }

  /**
   * Returns true if widget for given type exists.
   *
   * @param type Widget type
   */
  public hasWidget(type: string): boolean {
    return this.widgets.hasOwnProperty(type);
  }

  /**
   * Registers a new widget type.
   *
   * @param type Type
   * @param widget Widget component
   * @param context Widget context
   */
  public register<T extends WidgetContext<any>>(type: string, widget: any, context: T): void {
    this.widgets[type] = {widget: widget, context: context};
  }

  /**
   * Registers a new format for the schema validator.
   *
   * @param type Format type (date, myFormat)
   * @param format Format options and validation
   */
  public registerFormat<T extends WidgetContext<any>>(type: string, format: FormatDefinition): void {
    this._formats[type] = {format: format};
  }

  /**
   * Gets a widget entry for give type.
   *
   * @param type Widget type
   */
  public getWidgetType(type: string): { widget: any, context: WidgetContext<any> } {
    if (this.hasWidget(type)) {
      return this.widgets[type];
    }

    return this.defaultWidget;
  }

  /**
   * Returns list of supported widget types.
   */
  public getSupportedTyped(): Array<string> {
    const types = [];
    for (const widgetsKey in this.widgets) {
      if (this.widgets.hasOwnProperty(widgetsKey)) {
        types.push(widgetsKey);
      }
    }

    return types;
  }

  /**
   * Register widgets.
   */
  protected abstract registerWidgets();

  /**
   * Register formatters.
   */
  protected abstract registerFormatters();

  /**
   * Build validator array for given schema and arguments.
   *
   * @param schema Schema
   * @param parentSchema Parent schema
   * @param required True if field is required
   */
  public abstract getFormValidator(schema: any, parentSchema: any, required: boolean): ValidatorFn | ValidatorFn[];

  /**
   * Parse a form error and return a human readable error.
   *
   * @param key Error key
   * @param controlName FormControl name
   * @param schema Schema affected
   * @param detail Error details
   */
  public abstract getValidatorError(key: string, controlName: string, schema: any, detail: any): string;
}
