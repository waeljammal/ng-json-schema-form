import {WidgetRegistry} from './widget.registry';
import * as ajv from 'ajv';

/**
 * Validates json data against a schema.
 *
 * @author Wael Jammal
 */
export class SchemaValidator {
  private validator: ajv.Ajv;

  /**
   * Sets up validator.
   *
   * @param wr Widget registry
   */
  constructor(private wr: WidgetRegistry) {
    this.validator = new ajv({
      allErrors: true,
      format: 'full',
      unknownFormats: 'ignore',
      jsonPointers: true,
      coerceTypes: true,
      verbose: true
    });

    this.addFormatters();
  }

  /**
   * Returns true if schema is valid.
   *
   * @param schemaPart Schema to validate
   * @param data Data to validate
   */
  public validate(schemaPart: any, data: any): boolean {
    const validate = this.validator.compile(schemaPart);
    const valid: any = validate(data);
    return valid;
  }

  /**
   * Returns validation errors.
   *
   * @param schemaPart Schema to validate
   * @param data Data to validate
   */
  public validationErrors(schemaPart: any, data: any): Array<any> {
    const validate = this.validator.compile(schemaPart);
    const valid: any = validate(data);
    return validate.errors;
  }

  /**
   * Registers additional formatters.
   */
  private addFormatters() {
    for (const formatsKey in this.wr.formats) {
      if (this.wr.formats[formatsKey]) {
        const entry = this.wr.formats[formatsKey];
        this.validator.addFormat(formatsKey, entry.format);
      }
    }
  }
}
