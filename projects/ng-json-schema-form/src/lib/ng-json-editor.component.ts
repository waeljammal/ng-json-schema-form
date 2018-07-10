import {Component, EventEmitter, Injector, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Context} from './core/context';
import {FormBuilder} from '@angular/forms';
import {WidgetFactory} from './core/widget.factory';
import {WidgetRegistry} from './core';
import {SchemaParser} from './core/schema.parser';
import {SchemaValidator} from './core/schema.validator';
import {FormState} from './core/form.state';

@Component({
  selector: 'ng-json-editor',
  template: `
    <form *ngIf="context?.formGroup" [formGroup]="context?.formGroup">
      <ng-json-editor-form-element-chooser [context]="context">

      </ng-json-editor-form-element-chooser>
    </form>
  `,
  styles: []
})
export class NgJsonEditorComponent implements OnChanges {
  @Input()
  public schema: any;

  @Input()
  public model: any = {};

  @Output()
  public onChange = new EventEmitter<{ value: any, errors: any[], valid: boolean, formValid: boolean, schemaValid: boolean }>();

  public context: Context<any>;

  private readonly parser: SchemaParser;
  private readonly validator: SchemaValidator;
  private readonly state: FormState;

  constructor(private fb: FormBuilder,
              private wf: WidgetFactory,
              private wr: WidgetRegistry,
              private injector: Injector) {
    this.validator = new SchemaValidator(wr);
    this.state = new FormState(fb, wf, wr, this.validator, injector);
    this.parser = new SchemaParser(this.state);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schema']) {
      // console.log('schema changed');
      this.state.reset();
      this.parser.parse(this.schema, this.model || {}, true)
        .then(ctx => {
          this.context = ctx;

          if (!ctx) {
            this.state.reset();
            return;
          }

          ctx.formGroup.valueChanges.subscribe(v => {
            this.state.currentModel = v;
            Object.assign(this.model || {}, v);
            if (this.state.emitChangeEvent) {
              const schemaValid = this.validator.validate(this.schema, this.state.currentModel);
              const formValid = this.state.rootContext.formGroup.valid;
              const valid = schemaValid && formValid;
              const errors = this.validator.validationErrors(this.schema, this.state.currentModel);
              this.onChange.emit({
                value: this.state.currentModel,
                errors: errors,
                valid: valid,
                formValid: formValid,
                schemaValid: schemaValid
              });
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (changes['model']) {
      if (JSON.stringify(changes['model'].previousValue || {}) !== JSON.stringify(this.state.currentModel || {})) {
        // noinspection JSIgnoredPromiseFromCall
        this.applyModelChanges();
      }
    }
  }

  private async applyModelChanges() {
    if (this.model && this.context) {
      // console.log('model changed');
      const model = this.model || {};
      await this.parser.parse(this.schema, model, false, null, null, '$', true);
    }
  }
}
