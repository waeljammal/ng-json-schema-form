import {AtomicWidgetContext} from './atomic.widget.context';
import {FormControl} from '@angular/forms';

export class StringEnumWidgetContext extends AtomicWidgetContext<string> {
  private ctrl: FormControl;

  public initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      this.ctrl = this.state.fb.control(this.model || this.schema.enum.default);
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
