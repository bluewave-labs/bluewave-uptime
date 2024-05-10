import { InferError } from '../useValidation';
import { FieldSection, PickerValidDate } from '../../../models';
import { UsePickerValueProps, UsePickerValueParams, UsePickerValueResponse } from './usePickerValue.types';
/**
 * Manage the value lifecycle of all the pickers.
 */
export declare const usePickerValue: <TValue, TDate extends PickerValidDate, TSection extends FieldSection, TExternalProps extends UsePickerValueProps<TValue, any>>({ props, valueManager, valueType, wrapperVariant, validator, }: UsePickerValueParams<TValue, TDate, TExternalProps>) => UsePickerValueResponse<TValue, TSection, InferError<TExternalProps>>;
