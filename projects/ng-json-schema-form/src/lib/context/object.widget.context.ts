import {WidgetContext} from '../core/widget.context';
import {Injector} from '@angular/core';

export class ObjectWidgetContext extends WidgetContext<any> {
  constructor(private test: Injector) {
    super();
  }

  public initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // Don't want model to begin with {$: {}}
      if (this.path === '$') {
        this.createFormGroup({});
        resolve(true);
        return;
      }

      // Otherwise create a group for this object
      const ctrl = this.state.fb.group({});
      const controls = {};
      controls[this.groupId] = ctrl;
      this.createFormGroup(controls, ctrl);
      resolve(true);
    });
  }

  updateModel(model: any) {
    // Do nothing
  }
}
