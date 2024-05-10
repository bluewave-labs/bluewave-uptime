import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { SlotComponentProps } from '@mui/base/utils';
import { PickersCalendarHeader, PickersCalendarHeaderProps, PickersCalendarHeaderSlots, PickersCalendarHeaderSlotProps } from '../PickersCalendarHeader';
import { DayCalendarSlots, DayCalendarSlotProps, ExportedDayCalendarProps } from './DayCalendar';
import { DateCalendarClasses } from './dateCalendarClasses';
import { BaseDateValidationProps, YearValidationProps, MonthValidationProps, DayValidationProps } from '../internals/models/validation';
import { ExportedUseViewsOptions } from '../internals/hooks/useViews';
import { DateView, PickerValidDate, TimezoneProps } from '../models';
import { DefaultizedProps } from '../internals/models/helpers';
import { ExportedYearCalendarProps } from '../YearCalendar/YearCalendar.types';
import { ExportedMonthCalendarProps } from '../MonthCalendar/MonthCalendar.types';
export interface DateCalendarSlots<TDate extends PickerValidDate> extends PickersCalendarHeaderSlots, DayCalendarSlots<TDate> {
    /**
     * Custom component for calendar header.
     * Check the [PickersCalendarHeader](https://mui.com/x/api/date-pickers/pickers-calendar-header/) component.
     * @default PickersCalendarHeader
     */
    calendarHeader?: React.ElementType<PickersCalendarHeaderProps<TDate>>;
}
export interface DateCalendarSlotProps<TDate extends PickerValidDate> extends PickersCalendarHeaderSlotProps<TDate>, DayCalendarSlotProps<TDate> {
    calendarHeader?: SlotComponentProps<typeof PickersCalendarHeader, {}, DateCalendarProps<TDate>>;
}
export interface ExportedDateCalendarProps<TDate extends PickerValidDate> extends ExportedDayCalendarProps<TDate>, ExportedMonthCalendarProps, ExportedYearCalendarProps, BaseDateValidationProps<TDate>, DayValidationProps<TDate>, YearValidationProps<TDate>, MonthValidationProps<TDate>, TimezoneProps {
    /**
     * If `true`, the picker and text field are disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Make picker read only.
     * @default false
     */
    readOnly?: boolean;
    /**
     * If `true`, disable heavy animations.
     * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
     */
    reduceAnimations?: boolean;
    /**
     * Component displaying when passed `loading` true.
     * @returns {React.ReactNode} The node to render when loading.
     * @default () => <span data-mui-test="loading-progress">...</span>
     */
    renderLoading?: () => React.ReactNode;
    /**
     * Callback fired on year change.
     * @template TDate
     * @param {TDate} year The new year.
     */
    onYearChange?: (year: TDate) => void;
    /**
     * Callback fired on month change.
     * @template TDate
     * @param {TDate} month The new month.
     */
    onMonthChange?: (month: TDate) => void;
}
export interface DateCalendarProps<TDate extends PickerValidDate> extends ExportedDateCalendarProps<TDate>, ExportedUseViewsOptions<DateView> {
    /**
     * The selected value.
     * Used when the component is controlled.
     */
    value?: TDate | null;
    /**
     * The default selected value.
     * Used when the component is not controlled.
     */
    defaultValue?: TDate | null;
    /**
     * The date used to generate the new value when both `value` and `defaultValue` are empty.
     * @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`.
     */
    referenceDate?: TDate;
    className?: string;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DateCalendarClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: DateCalendarSlots<TDate>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: DateCalendarSlotProps<TDate>;
}
export type DateCalendarDefaultizedProps<TDate extends PickerValidDate> = DefaultizedProps<DateCalendarProps<TDate>, 'views' | 'openTo' | 'loading' | 'reduceAnimations' | 'renderLoading' | keyof BaseDateValidationProps<TDate>>;
