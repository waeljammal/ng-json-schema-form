import {AtomicWidgetContext} from './atomic.widget.context';
import {FormControl} from '@angular/forms';

export class DateTimeWidgetContext extends AtomicWidgetContext<Number> {
  private ctrl: DateTimeControl;

  public initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      this.ctrl = new DateTimeControl(this.model);
      const controls = {};
      controls[this.groupId] = this.ctrl;
      this.createFormGroup(controls);
      resolve(true);
    });
  }

  updateModel(model: any) {
    this.ctrl.setValue(model);
  }
}

/**
 * Enforces numeric format.
 *
 * @author Wael Jammal
 */
class DateTimeControl extends FormControl {
  setValue(value: any, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean
  }): void {
    super.setValue(value.toISOString(), options);
  }
}
