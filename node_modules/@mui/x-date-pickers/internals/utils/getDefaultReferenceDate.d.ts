import { FieldSection, MuiPickersAdapter, PickersTimezone, PickerValidDate } from '../../models';
export interface GetDefaultReferenceDateProps<TDate extends PickerValidDate> {
    maxDate?: TDate;
    minDate?: TDate;
    minTime?: TDate;
    maxTime?: TDate;
    disableIgnoringDatePartForTimeValidation?: boolean;
}
export declare const SECTION_TYPE_GRANULARITY: {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
export declare const getSectionTypeGranularity: (sections: FieldSection[]) => number;
export declare const getDefaultReferenceDate: <TDate extends PickerValidDate>({ props, utils, granularity, timezone, getTodayDate: inGetTodayDate, }: {
    props: GetDefaultReferenceDateProps<TDate>;
    utils: MuiPickersAdapter<TDate>;
    granularity: number;
    timezone: PickersTimezone;
    getTodayDate?: () => TDate;
}) => TDate;
