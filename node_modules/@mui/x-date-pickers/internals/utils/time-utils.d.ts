import { MuiPickersAdapter, PickerValidDate, TimeView } from '../../models';
import { DateOrTimeViewWithMeridiem, TimeViewWithMeridiem } from '../models';
export declare const isTimeView: (view: DateOrTimeViewWithMeridiem) => boolean;
export declare const isInternalTimeView: (view: DateOrTimeViewWithMeridiem) => view is TimeViewWithMeridiem;
export type Meridiem = 'am' | 'pm';
export declare const getMeridiem: <TDate extends PickerValidDate>(date: TDate | null, utils: MuiPickersAdapter<TDate>) => Meridiem | null;
export declare const convertValueToMeridiem: (value: number, meridiem: Meridiem | null, ampm: boolean) => number;
export declare const convertToMeridiem: <TDate extends PickerValidDate>(time: TDate, meridiem: Meridiem, ampm: boolean, utils: MuiPickersAdapter<TDate>) => TDate;
export declare const getSecondsInDay: <TDate extends PickerValidDate>(date: TDate, utils: MuiPickersAdapter<TDate>) => number;
export declare const createIsAfterIgnoreDatePart: <TDate extends PickerValidDate>(disableIgnoringDatePartForTimeValidation: boolean, utils: MuiPickersAdapter<TDate>) => (dateLeft: TDate, dateRight: TDate) => boolean;
export declare const resolveTimeFormat: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, { format, views, ampm }: {
    format?: string;
    views: readonly TimeView[];
    ampm: boolean;
}) => string;
