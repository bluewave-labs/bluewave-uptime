import * as React from 'react';
import { ButtonBaseProps } from '@mui/material/ButtonBase';
import { ExtendMui } from '../internals/models/helpers';
import { PickersDayClasses } from './pickersDayClasses';
import { PickerValidDate } from '../models';
export interface ExportedPickersDayProps {
    /**
     * If `true`, today's date is rendering without highlighting with circle.
     * @default false
     */
    disableHighlightToday?: boolean;
    /**
     * If `true`, days outside the current month are rendered:
     *
     * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
     *
     * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
     *
     * - ignored if `calendars` equals more than `1` on range pickers.
     * @default false
     */
    showDaysOutsideCurrentMonth?: boolean;
}
export interface PickersDayProps<TDate extends PickerValidDate> extends ExportedPickersDayProps, Omit<ExtendMui<ButtonBaseProps>, 'onKeyDown' | 'onFocus' | 'onBlur' | 'onMouseEnter' | 'LinkComponent'> {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PickersDayClasses>;
    /**
     * The date to show.
     */
    day: TDate;
    /**
     * If `true`, renders as disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * If `true`, days are rendering without margin. Useful for displaying linked range of days.
     * @default false
     */
    disableMargin?: boolean;
    isAnimating?: boolean;
    onFocus?: (event: React.FocusEvent<HTMLButtonElement>, day: TDate) => void;
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>, day: TDate) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>, day: TDate) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement>, day: TDate) => void;
    onDaySelect: (day: TDate) => void;
    /**
     * If `true`, day is outside of month and will be hidden.
     */
    outsideCurrentMonth: boolean;
    /**
     * If `true`, day is the first visible cell of the month.
     * Either the first day of the month or the first day of the week depending on `showDaysOutsideCurrentMonth`.
     */
    isFirstVisibleCell: boolean;
    /**
     * If `true`, day is the last visible cell of the month.
     * Either the last day of the month or the last day of the week depending on `showDaysOutsideCurrentMonth`.
     */
    isLastVisibleCell: boolean;
    /**
     * If `true`, renders as selected.
     * @default false
     */
    selected?: boolean;
    /**
     * If `true`, renders as today date.
     * @default false
     */
    today?: boolean;
}
type PickersDayComponent = (<TDate extends PickerValidDate>(props: PickersDayProps<TDate> & React.RefAttributes<HTMLButtonElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
 * API:
 *
 * - [PickersDay API](https://mui.com/x/api/date-pickers/pickers-day/)
 */
export declare const PickersDay: PickersDayComponent;
export {};
