import type { PickerValueManager } from '../hooks/usePicker';
import { DateValidationError, TimeValidationError, DateTimeValidationError, FieldSection, PickerValidDate } from '../../models';
import type { FieldValueManager } from '../hooks/useField';
export type SingleItemPickerValueManager<TValue = any, TDate extends PickerValidDate = any, TError extends DateValidationError | TimeValidationError | DateTimeValidationError = any> = PickerValueManager<TValue, TDate, TError>;
export declare const singleItemValueManager: SingleItemPickerValueManager;
export declare const singleItemFieldValueManager: FieldValueManager<any, any, FieldSection>;
