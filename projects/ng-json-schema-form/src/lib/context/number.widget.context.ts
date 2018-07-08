import {AtomicWidgetContext} from './atomic.widget.context';
import {FormControl} from '@angular/forms';

export class NumberWidgetContext extends AtomicWidgetContext<Number> {
  private ctrl: NumericControl;

  public initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      this.ctrl = new NumericControl(Number(this.model) || 0, this.getValidators());
      const controls = {};
      controls[this.groupId] = this.ctrl;
      this.createFormGroup(controls);
      resolve(true);
    });
  }

  updateModel(model: any) {
    this.ctrl.setValue(model || 0);
  }
}

/**
 * Enforces numeric format.
 *
 * @author Wael Jammal
 */
class NumericControl extends FormControl {
  setValue(value: any, options?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
    emitModelToViewChange?: boolean;
    emitViewToModelChange?: boolean
  }): void {
    super.setValue(Number(value), options);
  }
}
