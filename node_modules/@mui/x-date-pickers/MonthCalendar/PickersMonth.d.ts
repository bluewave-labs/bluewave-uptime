import * as React from 'react';
import { PickersMonthClasses } from './pickersMonthClasses';
export interface ExportedPickersMonthProps {
    classes?: Partial<PickersMonthClasses>;
}
export interface PickersMonthProps extends ExportedPickersMonthProps {
    'aria-current'?: React.AriaAttributes['aria-current'];
    'aria-label'?: React.AriaAttributes['aria-label'];
    autoFocus: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    onClick: (event: React.MouseEvent, month: number) => void;
    onKeyDown: (event: React.KeyboardEvent, month: number) => void;
    onFocus: (event: React.FocusEvent, month: number) => void;
    onBlur: (event: React.FocusEvent, month: number) => void;
    selected?: boolean;
    value: number;
    tabIndex: number;
    monthsPerRow: 3 | 4;
}
/**
 * @ignore - do not document.
 */
export declare const PickersMonth: React.NamedExoticComponent<PickersMonthProps>;
