import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {WidgetRegistry} from './widget.registry';
import {WidgetContext} from './widget.context';
import {WidgetAbstractComponent} from './widget.abstract.component';

/**
 * Factory creates new widget components using the registry to look them up by type.
 *
 * @author Wael Jammal
 */
@Injectable()
export class WidgetFactory {
  constructor(private registry: WidgetRegistry,
              private resolver: ComponentFactoryResolver) {

  }

  /**
   * Creates a widget.
   *
   * @param container Parent container
   * @param context Widget context
   */
  public create(container: ViewContainerRef, context: WidgetContext<any>): ComponentRef<WidgetAbstractComponent<any>> {
    const value = this.registry.getWidgetType(context.type);
    const componentFactory: any = this.resolver.resolveComponentFactory(value.widget);
    const componentRef: ComponentRef<WidgetAbstractComponent<any>> = container.createComponent(componentFactory);
    componentRef.instance.widgetContext = context;
    return componentRef;
  }
}
