import {forwardRef, InjectionToken} from '@angular/core';
import {DefaultWidgetRegistry, WidgetRegistry} from './core';

export const WIDGET_REGISTRY = new InjectionToken<WidgetRegistry>('WidgetRegistry', {
  factory: () => new DefaultWidgetRegistry()
});

