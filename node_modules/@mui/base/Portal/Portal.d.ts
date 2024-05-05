import * as React from 'react';
import { PortalProps } from './Portal.types';
/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * Demos:
 *
 * - [Portal](https://mui.com/base-ui/react-portal/)
 *
 * API:
 *
 * - [Portal API](https://mui.com/base-ui/react-portal/components-api/#portal)
 */
declare const Portal: React.ForwardRefExoticComponent<PortalProps & React.RefAttributes<Element>>;
export { Portal };
