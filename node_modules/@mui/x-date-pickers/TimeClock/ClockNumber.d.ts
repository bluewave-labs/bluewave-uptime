import * as React from 'react';
import { ClockNumberClasses } from './clockNumberClasses';
export interface ClockNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
    'aria-label': string;
    disabled: boolean;
    /**
     * Make sure callers pass an id which. It should be defined if selected.
     */
    id: string | undefined;
    index: number;
    inner: boolean;
    label: string;
    selected: boolean;
    classes?: Partial<ClockNumberClasses>;
}
/**
 * @ignore - internal component.
 */
export declare function ClockNumber(inProps: ClockNumberProps): React.JSX.Element;
