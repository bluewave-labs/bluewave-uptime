import * as React from 'react';
import { PickersFadeTransitionGroupClasses } from './pickersFadeTransitionGroupClasses';
export interface PickersFadeTransitionGroupProps {
    children: React.ReactElement;
    className?: string;
    reduceAnimations: boolean;
    transKey: React.Key;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PickersFadeTransitionGroupClasses>;
}
/**
 * @ignore - do not document.
 */
export declare function PickersFadeTransitionGroup(inProps: PickersFadeTransitionGroupProps): React.JSX.Element;
