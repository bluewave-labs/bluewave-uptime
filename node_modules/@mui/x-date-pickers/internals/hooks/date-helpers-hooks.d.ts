import { PickerOnChangeFn } from './useViews';
import { PickerSelectionState } from './usePicker';
import { PickersTimezone, PickerValidDate } from '../../models';
export interface MonthValidationOptions<TDate extends PickerValidDate> {
    disablePast?: boolean;
    disableFuture?: boolean;
    minDate: TDate;
    maxDate: TDate;
    timezone: PickersTimezone;
}
export declare function useNextMonthDisabled<TDate extends PickerValidDate>(month: TDate, { disableFuture, maxDate, timezone, }: Pick<MonthValidationOptions<TDate>, 'disableFuture' | 'maxDate' | 'timezone'>): boolean;
export declare function usePreviousMonthDisabled<TDate extends PickerValidDate>(month: TDate, { disablePast, minDate, timezone, }: Pick<MonthValidationOptions<TDate>, 'disablePast' | 'minDate' | 'timezone'>): boolean;
export declare function useMeridiemMode<TDate extends PickerValidDate>(date: TDate | null, ampm: boolean | undefined, onChange: PickerOnChangeFn<TDate>, selectionState?: PickerSelectionState): {
    meridiemMode: import("../utils/time-utils").Meridiem | null;
    handleMeridiemChange: (mode: 'am' | 'pm') => void;
};
