import {WidgetContext} from '../core/widget.context';
import {FormControl} from '@angular/forms';
import {Injectable} from '@angular/core';

export class AtomicWidgetContext<MT> extends WidgetContext<MT> {
  private atomicCtrl: FormControl;

  public initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      this.atomicCtrl = this.state.fb.control(this.model || '');
      const controls = {};
      controls[this.groupId] = this.atomicCtrl;
      this.createFormGroup(controls);
      resolve(true);
    });
  }

  updateModel(model: any) {
    this.atomicCtrl.setValue(model);
  }
}
