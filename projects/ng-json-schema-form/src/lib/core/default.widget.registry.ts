import {WidgetRegistry} from './widget.registry';
import {WidgetStringComponent} from '../widget/widget.string.component';
import {WidgetObjectOneOfComponent} from '../widget/widget.object.one.of.component';
import {WidgetArrayOneOfComponent} from '../widget/widget.array.one.of.component';
import {WidgetObjectComponent} from '../widget/widget.object.component';
import {ObjectWidgetContext} from '../context/object.widget.context';
import {StringWidgetContext} from '../context/string.widget.context';
import {ObjectOneOfWidgetContext} from '../context/object.one.of.widget.context';
import {WidgetStringEnumComponent} from '../widget/widget.string.enum.component';
import {StringEnumWidgetContext} from '../context/string.enum.widget.context';
import {NumberWidgetContext} from '../context/number.widget.context';
import {WidgetBooleanComponent} from '../widget/widget.boolean.component';
import {WidgetArrayComponent} from '../widget/widget.array.component';
import {ArrayWidgetContext} from '../context/array.widget.context';
import {BooleanWidgetContext} from '../context/boolean.widget.context';
import {WidgetStringTextAreaComponent} from '../widget/widget.string.text.area.component';
import {WidgetStringDatepickerComponent} from '../widget/widget.string.datepicker.component';
import {DateTimeWidgetContext} from '../context/date.time.widget.context';
import {DateWidgetContext} from '../context/date.widget.context';
import {ValidatorFn} from '@angular/forms/src/directives/validators';
import {UniversalValidators} from 'ng2-validators';
import {Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

/**
 * Default widgets included with the editor.
 *
 * @author Wael Jammal
 */
@Injectable()
export class DefaultWidgetRegistry extends WidgetRegistry {
  /**
   * Build validator array for given schema and arguments.
   *
   * @param schema Schema
   * @param parentSchema Parent schema
   * @param required True if field is required
   */
  public getFormValidator(schema: any, parentSchema: any, required: boolean): ValidatorFn | ValidatorFn[] {
    const validators = [];

    if (required) {
      validators.push(Validators.required);
    }

    if (schema.hasOwnProperty('minLength')) {
      validators.push(UniversalValidators.minLength(schema.minLength));
    }

    if (schema.hasOwnProperty('maxLength')) {
      validators.push(UniversalValidators.maxLength(schema.maxLength));
    }

    if (schema.hasOwnProperty('minimum')) {
      validators.push(UniversalValidators.min(Number(schema.minimum)));
    }

    if (schema.hasOwnProperty('maximum')) {
      validators.push(UniversalValidators.max(Number(schema.maximum)));
    }

    return validators;
  }

  /**
   * Register widgets.
   */
  protected registerWidgets() {
    // Widgets
    this.register('[type=object][^oneOf]', WidgetObjectComponent, ObjectWidgetContext.prototype);
    this.register('[type=object][oneOf]', WidgetObjectOneOfComponent, ObjectOneOfWidgetContext.prototype);
    this.register('[type=array]', WidgetArrayComponent, ArrayWidgetContext.prototype);
    this.register('[type=array][oneOf]', WidgetArrayOneOfComponent, ObjectWidgetContext.prototype);
    this.register('[type=string][enum]', WidgetStringEnumComponent, StringEnumWidgetContext.prototype);
    this.register('[type=string][^enum]', WidgetStringComponent, StringWidgetContext.prototype);
    this.register('[type=number][^enum]', WidgetStringComponent, NumberWidgetContext.prototype);
    this.register('[type=integer][^enum]', WidgetStringComponent, NumberWidgetContext.prototype);
    this.register('[type=boolean][^enum]', WidgetBooleanComponent, BooleanWidgetContext.prototype);
    this.register('[type=string][^enum][format=textarea]', WidgetStringTextAreaComponent, StringWidgetContext.prototype);
    this.register('[type=string][^enum][format=date]', WidgetStringDatepickerComponent, DateWidgetContext.prototype);
    this.register('[type=string][^enum][format=date-time]', WidgetStringDatepickerComponent, DateTimeWidgetContext.prototype);
  }

  /**
   * Register formatters.
   */
  protected registerFormatters() {
    this.registerFormat('textarea', {
      validate: () => true
    });
    this.registerFormat('color', {
      validate: () => true
    });
    this.registerFormat('password', {
      validate: () => true
    });
    this.registerFormat('date-time', {
      validate: () => true
    });
  }

  /**
   * Parse a form error and return a human readable error.
   *
   * @param key Error key
   * @param controlName FormControl name
   * @param schema Schema affected
   * @param detail Error details
   */
  public getValidatorError(key: string, controlName: string, schema: any, detail: any): string {
    switch (key) {
      case 'required':
        return `${schema.title || controlName} is required`;
      case 'minLength':
        return `Length should be a minimum of ${detail.requiredMinLength}`;
      case 'maxLength':
        return `Length should be a maximum of ${detail.requiredMaxLength} (${detail.currentLength})`;
      case 'min':
        return `Value should be >= ${detail.required}`;
      case 'max':
        return `Value should be <= ${detail.required}`;
      default:
        console.warn('Missing validation handler for ' + key, detail);
        return `Validator not implemented for ${key}`;
    }
  }
}
