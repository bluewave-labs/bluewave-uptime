import { Validator } from '../../hooks/useValidation';
import { BaseTimeValidationProps, TimeValidationProps } from '../../models/validation';
import { PickerValidDate, TimeValidationError, TimezoneProps } from '../../../models';
import { DefaultizedProps } from '../../models/helpers';
export interface TimeComponentValidationProps<TDate extends PickerValidDate> extends Required<BaseTimeValidationProps>, TimeValidationProps<TDate>, DefaultizedProps<TimezoneProps, 'timezone'> {
}
export declare const validateTime: Validator<any | null, any, TimeValidationError, TimeComponentValidationProps<any>>;
