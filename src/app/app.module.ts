import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {NgJsonEditorModule} from '../../projects/ng-json-schema-form/src/lib/ng-json-editor.module';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgJsonEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
