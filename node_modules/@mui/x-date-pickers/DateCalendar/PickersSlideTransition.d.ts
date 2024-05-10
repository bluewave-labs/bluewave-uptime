import * as React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { PickersSlideTransitionClasses } from './pickersSlideTransitionClasses';
export type SlideDirection = 'right' | 'left';
export interface ExportedSlideTransitionProps {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PickersSlideTransitionClasses>;
}
export interface SlideTransitionProps extends Omit<CSSTransitionProps, 'timeout'>, ExportedSlideTransitionProps {
    children: React.ReactElement;
    className?: string;
    reduceAnimations: boolean;
    slideDirection: SlideDirection;
    transKey: React.Key;
}
/**
 * @ignore - do not document.
 */
export declare function PickersSlideTransition(inProps: SlideTransitionProps): React.JSX.Element;
