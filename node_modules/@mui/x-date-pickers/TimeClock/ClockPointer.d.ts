import * as React from 'react';
import { TimeView } from '../models';
import { ClockPointerClasses } from './clockPointerClasses';
export interface ClockPointerProps extends React.HTMLAttributes<HTMLDivElement> {
    hasSelected: boolean;
    isInner: boolean;
    type: TimeView;
    viewValue: number;
    classes?: Partial<ClockPointerClasses>;
}
/**
 * @ignore - internal component.
 */
export declare function ClockPointer(inProps: ClockPointerProps): React.JSX.Element;
