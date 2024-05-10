import * as React from 'react';
export interface CssAnimationProps {
    children?: React.ReactNode;
    className?: string;
    /**
     * The name of the CSS animation (the `animation-name` CSS property) applied to the component when
     * the transition is requested to enter.
     */
    enterAnimationName?: string;
    /**
     * The name of the CSS class applied to the component when the transition
     * is requested to enter.
     */
    enterClassName?: string;
    /**
     * The name of the CSS animation (the `animation-name` CSS property) applied to the component when
     * the transition is requested to exit.
     */
    exitAnimationName?: string;
    /**
     * The name of the CSS class applied to the component when the transition
     * is requested to exit.
     */
    exitClassName?: string;
}
/**
 *
 * Demos:
 *
 * - [Transitions](https://mui.com/base-ui/react-transitions/)
 *
 * API:
 *
 * - [CssAnimation API](https://mui.com/base-ui/react-transitions/components-api/#css-animation)
 */
declare function CssAnimation(props: CssAnimationProps): React.JSX.Element;
declare namespace CssAnimation {
    var propTypes: any;
}
export { CssAnimation };
