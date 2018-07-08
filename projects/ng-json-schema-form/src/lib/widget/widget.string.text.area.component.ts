import {Component} from '@angular/core';
import {WidgetAbstractComponent} from '../core/widget.abstract.component';
import {StringWidgetContext} from '../context/string.widget.context';

@Component({
  selector: 'ng-json-editor-widget-string-text-area',
  template: `
    <mat-form-field [formGroup]="widgetContext.formGroup"
                    [hidden]="widgetContext.hidden"
                    *ngIf="widgetContext.ready">
      <textarea matInput
                [attr.disabled]="widgetContext.schema.options?.readOnly ? true : null"
                [formControlName]="widgetContext.groupId"
                [attr.maxLength]="widgetContext.schema.maxLength || null"
                [attr.minLength]="widgetContext.schema.minLength || null"
                [placeholder]="widgetContext.schema.title"
                [rows]="widgetContext.schema?.options?.rows || 3">
      </textarea>
      <mat-hint *ngIf="widgetContext.schema.description">{{widgetContext.schema.description}}</mat-hint>
      <!--<mat-error *ngFor="let error of widgetContext.getAllErrors(widgetContext.groupId)">-->
      <!--{{error.value}}-->
      <!--</mat-error>-->
    </mat-form-field>
  `,
  styles: []
})
export class WidgetStringTextAreaComponent extends WidgetAbstractComponent<StringWidgetContext> {

}
