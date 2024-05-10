import * as React from 'react';
import { PickersYearClasses } from './pickersYearClasses';
export interface ExportedPickersYearProps {
    classes?: Partial<PickersYearClasses>;
}
export interface PickersYearProps extends ExportedPickersYearProps {
    'aria-current'?: React.AriaAttributes['aria-current'];
    autoFocus?: boolean;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick: (event: React.MouseEvent, year: number) => void;
    onKeyDown: (event: React.KeyboardEvent, year: number) => void;
    onFocus: (event: React.FocusEvent, year: number) => void;
    onBlur: (event: React.FocusEvent, year: number) => void;
    selected: boolean;
    value: number;
    tabIndex: number;
    yearsPerRow: 3 | 4;
}
/**
 * @ignore - internal component.
 */
export declare const PickersYear: React.NamedExoticComponent<PickersYearProps>;
