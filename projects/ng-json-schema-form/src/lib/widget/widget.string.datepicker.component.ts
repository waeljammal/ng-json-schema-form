import {Component} from '@angular/core';
import {WidgetAbstractComponent} from '../core/widget.abstract.component';
import {StringWidgetContext} from '../context/string.widget.context';

@Component({
  selector: 'ng-json-editor-widget-string-datepicker',
  template: `
    <mat-form-field [formGroup]="widgetContext.formGroup"
                    [hidden]="widgetContext.schema.hidden"
                    *ngIf="widgetContext.ready">
      <input matInput
             [attr.disabled]="widgetContext.schema.options?.readOnly ? true : null"
             [placeholder]="widgetContext.schema.title"
             [formControlName]="widgetContext.groupId"
             [matDatepicker]="datepicker">
      <mat-hint *ngIf="widgetContext.schema.description">{{widgetContext.schema.description}}</mat-hint>
      <mat-datepicker-toggle matSuffix [for]="datepicker"></mat-datepicker-toggle>
      <mat-datepicker #datepicker></mat-datepicker>
      <!--<mat-error *ngFor="let error of widgetContext.getAllErrors(widgetContext.groupId)">-->
      <!--{{error.value}}-->
      <!--</mat-error>-->
    </mat-form-field>
  `,
  styles: []
})
export class WidgetStringDatepickerComponent extends WidgetAbstractComponent<StringWidgetContext> {

}
