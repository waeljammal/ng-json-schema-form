import {Component} from '@angular/core';
import {ObjectWidgetContext} from '../context/object.widget.context';
import {WidgetAbstractComponent} from '../core/widget.abstract.component';
import {ArrayWidgetContext} from '../context/array.widget.context';

@Component({
  selector: 'ng-json-editor-widget-array',
  template: `
    <fieldset [formGroup]="widgetContext.formGroup">
      <legend *ngIf="widgetContext.schema.title">{{widgetContext.schema.title}}</legend>
      <div *ngIf="widgetContext.schema.description">{{widgetContext.schema.description}}</div>

      <fieldset *ngFor="let context of widgetContext.childContexts; let i = index" class="array-item">
        <legend>Item {{i + 1}}</legend>
        <button (click)="widgetContext.remove(i)"
                class="delete"
                mat-icon-button>
          <mat-icon>delete</mat-icon>
        </button>
        <ng-json-editor-form-element-chooser [context]="context">

        </ng-json-editor-form-element-chooser>
      </fieldset>

      <div class="actions">
        <button (click)="widgetContext.add()" mat-button class="mat-raised-button mat-primary">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </fieldset>
  `,
  styleUrls: ['./widget.array.component.scss']
})
export class WidgetArrayComponent extends WidgetAbstractComponent<ArrayWidgetContext> {
}
