import { DateView, FieldValueType, MuiPickersAdapter, PickersTimezone, PickerValidDate } from '../../models';
import { DateOrTimeViewWithMeridiem } from '../models';
export declare const mergeDateAndTime: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, dateParam: TDate, timeParam: TDate) => TDate;
interface FindClosestDateParams<TDate extends PickerValidDate> {
    date: TDate;
    disableFuture?: boolean;
    disablePast?: boolean;
    maxDate: TDate;
    minDate: TDate;
    isDateDisabled: (date: TDate) => boolean;
    utils: MuiPickersAdapter<TDate>;
    timezone: PickersTimezone;
}
export declare const findClosestEnabledDate: <TDate extends PickerValidDate>({ date, disableFuture, disablePast, maxDate, minDate, isDateDisabled, utils, timezone, }: FindClosestDateParams<TDate>) => TDate | null;
export declare const replaceInvalidDateByNull: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, value: TDate | null) => TDate | null;
export declare const applyDefaultDate: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, value: TDate | null | undefined, defaultValue: TDate) => TDate;
export declare const areDatesEqual: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, a: TDate, b: TDate) => boolean;
export declare const getMonthsInYear: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, year: TDate) => TDate[];
export declare const getTodayDate: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, timezone: PickersTimezone, valueType?: FieldValueType) => TDate;
export declare const formatMeridiem: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, meridiem: 'am' | 'pm') => string;
export declare const isDatePickerView: (view: DateOrTimeViewWithMeridiem) => view is DateView;
export declare const resolveDateFormat: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, { format, views }: {
    format?: string;
    views: readonly DateView[];
}, isInToolbar: boolean) => string;
export declare const getWeekdays: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, date: TDate) => TDate[];
export {};
