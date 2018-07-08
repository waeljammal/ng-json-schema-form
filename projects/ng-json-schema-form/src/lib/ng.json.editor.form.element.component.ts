import {
  ChangeDetectorRef, Component, ComponentRef, EventEmitter, Input, OnChanges, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {WidgetFactory} from './core/widget.factory';
import {WidgetContext} from './core/widget.context';

@Component({
  selector: 'ng-json-editor-form-element-chooser',
  template: `
    <div #target></div>
  `,
  styleUrls: []
})
export class JsonEditorFormElementChooserComponent implements OnChanges {
  @ViewChild('target', {read: ViewContainerRef}) container: ViewContainerRef;
  @Input() context: WidgetContext<any>;
  @Output() widgetInstantiated = new EventEmitter<any>();

  private widgetInstance: any;
  private ref: ComponentRef<any>;

  constructor(private widgetFactory: WidgetFactory = null,
              private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: any) {
    if (changes['context'].currentValue && this.context) {
      if (this.ref) {
        this.ref.destroy();
        this.ref = null;
      }

      this.ref = this.widgetFactory.create(this.container, this.context);
      this.ref.instance.widgetContext = this.context;
      this.widgetInstance = this.ref.instance;
      this.widgetInstantiated.emit(this.context);
      this.cdr.detectChanges();
    }
  }
}
