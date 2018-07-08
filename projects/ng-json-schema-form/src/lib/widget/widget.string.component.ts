import {Component} from '@angular/core';
import {WidgetAbstractComponent} from '../core/widget.abstract.component';
import {StringWidgetContext} from '../context/string.widget.context';

@Component({
  selector: 'ng-json-editor-widget-string',
  template: `
    <mat-form-field [formGroup]="widgetContext.formGroup"
                    [hidden]="widgetContext.hidden"
                    *ngIf="widgetContext.ready">
      <input matInput
             [attr.disabled]="widgetContext.schema.readOnly ? true : null"
             [attr.maxLength]="widgetContext.schema.maxLength || null"
             [attr.minLength]="widgetContext.schema.minLength || null"
             [attr.min]="widgetContext.schema.minimum || null"
             [attr.max]="widgetContext.schema.maximum || null"
             [placeholder]="widgetContext.schema.title"
             [formControlName]="widgetContext.groupId"
             [required]="widgetContext.required"
             [pattern]="widgetContext.schema.options?.pattern"
             [type]="widgetContext.schema.format || widgetContext.schema.type">
      <mat-hint *ngIf="widgetContext.schema.description">{{widgetContext.schema.description}}</mat-hint>
      <mat-error *ngFor="let error of widgetContext.getAllErrors()">
        {{error.value}}
      </mat-error>
    </mat-form-field>
  `,
  styles: []
})
export class WidgetStringComponent extends WidgetAbstractComponent<StringWidgetContext> {

}
