import { DateComponentValidationProps } from '../internals/utils/validation/validateDate';
import { PickerValidDate } from '../models';
export declare const useIsDateDisabled: <TDate extends PickerValidDate>({ shouldDisableDate, shouldDisableMonth, shouldDisableYear, minDate, maxDate, disableFuture, disablePast, timezone, }: DateComponentValidationProps<TDate>) => (day: TDate | null) => boolean;
