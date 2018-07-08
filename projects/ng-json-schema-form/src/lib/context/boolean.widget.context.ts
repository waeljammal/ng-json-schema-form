import {AtomicWidgetContext} from './atomic.widget.context';
import {FormControl} from '@angular/forms';
import {Util} from '../core/util';

export class BooleanWidgetContext extends AtomicWidgetContext<boolean> {
  private ctrl: FormControl;

  public initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      this.ctrl = this.state.fb.control(this.model === undefined ? false : this.model);
      const controls = {};
      controls[this.groupId] = this.ctrl;
      this.createFormGroup(controls);
      resolve(true);
    });
  }

  updateModel(model: any) {
    this.ctrl.setValue( Util.isEmpty(model) ? false : model);
  }
}
