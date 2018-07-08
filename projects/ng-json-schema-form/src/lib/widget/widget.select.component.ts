import {Component} from '@angular/core';
import {WidgetAbstractComponent} from '../core/widget.abstract.component';
import {ObjectOneOfWidgetContext} from '../context/object.one.of.widget.context';

@Component({
  selector: 'ng-json-editor-widget-object-one-of',
  template: `
    <fieldset *ngIf="widgetContext.ready">
      <legend *ngIf="widgetContext.schema.title">{{widgetContext.schema.title}}</legend>
      <mat-form-field [hidden]="widgetContext.schema?.hidden">
        <mat-select placeholder="Select One" #select
                    [formControl]="widgetContext.typeCtrl"
                    class="widget-select">
          <mat-option *ngFor="let value of widgetContext.schema.oneOf" [value]="value">
            {{value.title}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <ng-json-editor-form-element-chooser *ngFor="let ctx of widgetContext.childContexts"
                                           [context]="ctx">

      </ng-json-editor-form-element-chooser>
    </fieldset>
  `,
  styles: []
})
export class WidgetSelectComponent extends WidgetAbstractComponent<ObjectOneOfWidgetContext> {

}
