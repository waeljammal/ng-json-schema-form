import {Component} from '@angular/core';
import {WidgetAbstractComponent} from '../core/widget.abstract.component';
import {AtomicWidgetContext} from '../context/atomic.widget.context';

@Component({
  selector: 'ng-json-editor-widget-string',
  template: `
    <div [formGroup]="widgetContext.formGroup" [hidden]="widgetContext.hidden">
      <mat-slide-toggle [formControlName]="widgetContext.groupId">
        {{widgetContext.schema.title}}
      </mat-slide-toggle>

      <!--<mat-hint *ngIf="widgetContext.schema.description">{{widgetContext.schema.description}}</mat-hint>-->
      <!--<mat-error *ngFor="let error of widgetContext.getAllErrors(widgetContext.groupId)">-->
        <!--{{error.value}}-->
      <!--</mat-error>-->
    </div>
  `,
  styles: []
})
export class WidgetBooleanComponent extends WidgetAbstractComponent<AtomicWidgetContext<boolean>> {

}
