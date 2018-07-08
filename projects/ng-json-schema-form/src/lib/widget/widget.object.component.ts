import {Component} from '@angular/core';
import {ObjectWidgetContext} from '../context/object.widget.context';
import {WidgetAbstractComponent} from '../core/widget.abstract.component';

@Component({
  selector: 'ng-json-editor-widget-object',
  template: `
    <fieldset [formGroup]="widgetContext.formGroup"
              *ngIf="widgetContext.ready">
      <legend *ngIf="widgetContext.schema.title">{{widgetContext.schema.title}}</legend>
      <ng-json-editor-form-element-chooser *ngFor="let ctx of widgetContext.childContexts"
                                           [context]="ctx">

      </ng-json-editor-form-element-chooser>
    </fieldset>
  `,
  styles: []
})
export class WidgetObjectComponent extends WidgetAbstractComponent<ObjectWidgetContext> {
}
