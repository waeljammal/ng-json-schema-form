import {NgModule} from '@angular/core';
import {NgJsonEditorComponent} from './ng-json-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {WidgetRegistry} from './core';
import {DefaultWidgetRegistry} from './core';
import {WidgetFactory} from './core/widget.factory';
import {WidgetModule} from './widget/widget.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    WidgetModule
  ],
  declarations: [
    NgJsonEditorComponent
  ],
  exports: [
    NgJsonEditorComponent,
    WidgetModule
  ],
  providers: [
    {provide: WidgetRegistry, useClass: DefaultWidgetRegistry},
    WidgetFactory
  ],
  entryComponents: [
    NgJsonEditorComponent
  ]
})
export class NgJsonEditorModule {
}
