import * as React from 'react';
export interface CssTransitionProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The name of the CSS class applied to the component when the transition
     * is requested to enter.
     */
    enterClassName?: string;
    /**
     * The name of the CSS class applied to the component when the transition
     * is requested to exit.
     */
    exitClassName?: string;
    /**
     * The name of the CSS property that is transitioned the longest (has the largest `transition-duration`) on exit.
     * This is used to determine when the transition has ended.
     * If not specified, the transition will be considered finished end when the first property is transitioned.
     * If all properties have the same `transition-duration` (or there is just one transitioned property), this can be omitted.
     */
    lastTransitionedPropertyOnExit?: string;
}
/**
 * A utility component that hooks up to the Base UI transitions API and
 * applies a CSS transition to its children when necessary.
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/)
 *
 * API:
 *
 * - [CssTransition API](https://mui.com/base-ui/react-transitions/components-api/#css-transition)
 */
declare const CssTransition: React.ForwardRefExoticComponent<CssTransitionProps & React.RefAttributes<HTMLDivElement>>;
export { CssTransition };
