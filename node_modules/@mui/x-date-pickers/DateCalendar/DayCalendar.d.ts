import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import { PickersDay, PickersDayProps, ExportedPickersDayProps } from '../PickersDay/PickersDay';
import { PickerOnChangeFn } from '../internals/hooks/useViews';
import { SlideDirection, SlideTransitionProps } from './PickersSlideTransition';
import { BaseDateValidationProps, DayValidationProps, MonthValidationProps, YearValidationProps } from '../internals/models/validation';
import { DayCalendarClasses } from './dayCalendarClasses';
import { PickerValidDate, TimezoneProps } from '../models';
import { DefaultizedProps } from '../internals/models/helpers';
export interface DayCalendarSlots<TDate extends PickerValidDate> {
    /**
     * Custom component for day.
     * Check the [PickersDay](https://mui.com/x/api/date-pickers/pickers-day/) component.
     * @default PickersDay
     */
    day?: React.ElementType<PickersDayProps<TDate>>;
}
export interface DayCalendarSlotProps<TDate extends PickerValidDate> {
    day?: SlotComponentProps<typeof PickersDay, {}, DayCalendarProps<TDate> & {
        day: TDate;
        selected: boolean;
    }>;
}
export interface ExportedDayCalendarProps<TDate extends PickerValidDate> extends ExportedPickersDayProps {
    /**
     * If `true`, calls `renderLoading` instead of rendering the day calendar.
     * Can be used to preload information and show it in calendar.
     * @default false
     */
    loading?: boolean;
    /**
     * Component rendered on the "day" view when `props.loading` is true.
     * @returns {React.ReactNode} The node to render when loading.
     * @default () => "..."
     */
    renderLoading?: () => React.ReactNode;
    /**
     * Formats the day of week displayed in the calendar header.
     * @param {TDate} date The date of the day of week provided by the adapter.
     * @returns {string} The name to display.
     * @default (date: TDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
     */
    dayOfWeekFormatter?: (date: TDate) => string;
    /**
     * If `true`, the week number will be display in the calendar.
     */
    displayWeekNumber?: boolean;
    /**
     * The day view will show as many weeks as needed after the end of the current month to match this value.
     * Put it to 6 to have a fixed number of weeks in Gregorian calendars
     */
    fixedWeekNumber?: number;
}
export interface DayCalendarProps<TDate extends PickerValidDate> extends ExportedDayCalendarProps<TDate>, DayValidationProps<TDate>, MonthValidationProps<TDate>, YearValidationProps<TDate>, Required<BaseDateValidationProps<TDate>>, DefaultizedProps<TimezoneProps, 'timezone'> {
    autoFocus?: boolean;
    className?: string;
    currentMonth: TDate;
    selectedDays: (TDate | null)[];
    onSelectedDaysChange: PickerOnChangeFn<TDate>;
    disabled?: boolean;
    focusedDay: TDate | null;
    isMonthSwitchingAnimating: boolean;
    onFocusedDayChange: (newFocusedDay: TDate) => void;
    onMonthSwitchingAnimationEnd: () => void;
    readOnly?: boolean;
    reduceAnimations: boolean;
    slideDirection: SlideDirection;
    TransitionProps?: Partial<SlideTransitionProps>;
    hasFocus?: boolean;
    onFocusedViewChange?: (newHasFocus: boolean) => void;
    gridLabelId?: string;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DayCalendarClasses>;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: DayCalendarSlots<TDate>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: DayCalendarSlotProps<TDate>;
}
/**
 * @ignore - do not document.
 */
export declare function DayCalendar<TDate extends PickerValidDate>(inProps: DayCalendarProps<TDate>): React.JSX.Element;
