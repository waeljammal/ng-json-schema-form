import {WidgetContext} from '../core/widget.context';
import {SchemaParser} from '../core/schema.parser';
import {FormArray} from '@angular/forms';

export class ArrayWidgetContext extends WidgetContext<Array<any>> {
  private parser: SchemaParser;

  public initialize(): Promise<boolean> {
    this.parser = new SchemaParser(this.state);

    return new Promise((resolve) => {
      // Don't want model to begin with {$: {}}
      if (this.path === '$') {
        this.createFormArray([]);
        resolve(true);
        return;
      }

      // Otherwise create a group for this object
      const controls = [];
      this.createFormArray(controls);
      resolve(true);
    });
  }

  public updateModel(model: any) {
    this.removeAllChildren();

    if (Array.isArray(model)) {
      model.forEach(m => {
        this.add(m);
      });
    }
  }

  /**
   * Add a new entry to the array group.
   */
  public add(model: any = {}): void {
    // Supply a prefix that will resolve to this array widget and postfix it with the length
    // so that multiple entries can be added to the array and indexed.
    const prefix = `${this.path}.${String(this.childContexts.length)}`;
    // Parse matching schema
    this.parser.parse(this.schema.items, model, true, prefix)
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * Remove an entry from the array group.
   *
   * @param index Index of item to remove
   */
  public remove(index: number): void {
    this.childContexts.splice(index, 1);

    if (this.formGroup instanceof FormArray) {
      const grp: FormArray = this.formGroup;
      grp.removeAt(index);
    }
  }
}
