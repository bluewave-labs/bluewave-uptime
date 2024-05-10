import { Validator } from '../../hooks/useValidation';
import { BaseDateValidationProps, DayValidationProps, MonthValidationProps, YearValidationProps } from '../../models/validation';
import { DateValidationError, PickerValidDate, TimezoneProps } from '../../../models';
import { DefaultizedProps } from '../../models/helpers';
export interface DateComponentValidationProps<TDate extends PickerValidDate> extends DayValidationProps<TDate>, MonthValidationProps<TDate>, YearValidationProps<TDate>, Required<BaseDateValidationProps<TDate>>, DefaultizedProps<TimezoneProps, 'timezone'> {
}
export declare const validateDate: Validator<any | null, any, DateValidationError, DateComponentValidationProps<any>>;
