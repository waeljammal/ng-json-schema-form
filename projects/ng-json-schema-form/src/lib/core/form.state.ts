import {FormBuilder} from '@angular/forms';
import {WidgetFactory} from './widget.factory';
import {WidgetRegistry} from './widget.registry';
import {WidgetContext} from './widget.context';
import {SchemaValidator} from './schema.validator';
import {Injector} from '@angular/core';

/**
 * Caches form state.
 *
 * @author Wael Jammal
 */
export class FormState {
  /** When true events will be emitted **/
  public emitChangeEvent = true;

  /** Current data model **/
  public currentModel: any;

  /** Root widget **/
  public rootContext: WidgetContext<any>;

  /**
   * @param fb Form builder
   * @param wf Widget factory
   * @param wr Widget registry
   * @param validator Schema validator
   */
  constructor(public fb: FormBuilder,
              public wf: WidgetFactory,
              public wr: WidgetRegistry,
              public validator: SchemaValidator,
              public injector: Injector) {

  }

  reset() {
    if (this.rootContext) {
      this.rootContext.doDestroy();
      this.rootContext = null;
    }

    this.currentModel = null;
  }
}
