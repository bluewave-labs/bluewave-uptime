import { Validator } from '../../hooks/useValidation';
import { DateComponentValidationProps } from './validateDate';
import { TimeComponentValidationProps } from './validateTime';
import { DateTimeValidationError, PickerValidDate } from '../../../models';
export interface DateTimeComponentValidationProps<TDate extends PickerValidDate> extends DateComponentValidationProps<TDate>, TimeComponentValidationProps<TDate> {
}
export declare const validateDateTime: Validator<any | null, any, DateTimeValidationError, DateTimeComponentValidationProps<any>>;
