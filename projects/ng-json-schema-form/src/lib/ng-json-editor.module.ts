import {NgModule} from '@angular/core';
import {NgJsonEditorComponent} from './ng-json-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DefaultWidgetRegistry} from './core';
import {WidgetFactory} from './core/widget.factory';
import {WidgetModule} from './widget/widget.module';
import {WIDGET_REGISTRY} from './ng-json-editor-config';

export function createDefaultRegistry() {
  return new DefaultWidgetRegistry();
}

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
    WidgetFactory,
    {provide: WIDGET_REGISTRY, useFactory: createDefaultRegistry}
  ],
  entryComponents: [
    NgJsonEditorComponent
  ]
})
export class NgJsonEditorModule {
}
