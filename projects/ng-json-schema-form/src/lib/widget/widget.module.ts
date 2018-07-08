import {NgModule} from '@angular/core';
import {WidgetObjectComponent} from './widget.object.component';
import {WidgetStringComponent} from './widget.string.component';
import {WidgetObjectOneOfComponent} from './widget.object.one.of.component';
import {WidgetArrayOneOfComponent} from './widget.array.one.of.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  MAT_DATE_LOCALE,
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {JsonEditorFormElementChooserComponent} from '../ng.json.editor.form.element.component';
import {WidgetStringEnumComponent} from './widget.string.enum.component';
import {WidgetBooleanComponent} from './widget.boolean.component';
import {WidgetArrayComponent} from './widget.array.component';
import {WidgetStringTextAreaComponent} from './widget.string.text.area.component';
import {WidgetStringDatepickerComponent} from './widget.string.datepicker.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  declarations: [
    JsonEditorFormElementChooserComponent,
    WidgetObjectComponent,
    WidgetArrayComponent,
    WidgetStringComponent,
    WidgetObjectOneOfComponent,
    WidgetArrayOneOfComponent,
    WidgetStringEnumComponent,
    WidgetBooleanComponent,
    WidgetStringTextAreaComponent,
    WidgetStringDatepickerComponent
  ],
  exports: [
    JsonEditorFormElementChooserComponent,
    WidgetObjectComponent,
    WidgetArrayComponent,
    WidgetStringComponent,
    WidgetObjectOneOfComponent,
    WidgetArrayOneOfComponent,
    WidgetStringEnumComponent,
    WidgetBooleanComponent,
    WidgetStringTextAreaComponent,
    WidgetStringDatepickerComponent
  ],
  entryComponents: [
    JsonEditorFormElementChooserComponent,
    WidgetObjectComponent,
    WidgetArrayComponent,
    WidgetStringComponent,
    WidgetObjectOneOfComponent,
    WidgetArrayOneOfComponent,
    WidgetStringEnumComponent,
    WidgetBooleanComponent,
    WidgetStringTextAreaComponent,
    WidgetStringDatepickerComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'utc'},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class WidgetModule {

}
