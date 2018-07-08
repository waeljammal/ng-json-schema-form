import {WidgetContext} from './widget.context';

/**
 * Base class for all widget components.
 *
 * @author Wael Jammal
 */
export abstract class WidgetAbstractComponent<T extends WidgetContext<any>> {
  /**
   * Context for this component.
   */
  public widgetContext: T;
}
