import {Component} from '@angular/core';
import {WidgetAbstractComponent} from '../core/widget.abstract.component';
import {StringWidgetContext} from '../context/string.widget.context';

@Component({
  selector: 'ng-json-editor-widget-string-enum',
  template: `
    <mat-form-field [formGroup]="widgetContext.formGroup"
                    [hidden]="widgetContext.hidden"
                    *ngIf="widgetContext.ready">
      <mat-select [placeholder]="widgetContext.schema.title" #select
                  [formControlName]="widgetContext.groupId"
                  class="widget-select">
        <mat-option *ngFor="let value of widgetContext.schema.enum" [value]="value">
          {{value}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: []
})
export class WidgetStringEnumComponent extends WidgetAbstractComponent<StringWidgetContext> {

}
