import { UsePickerParams, UsePickerProps, UsePickerResponse } from './usePicker.types';
import { InferError } from '../useValidation';
import { FieldSection, PickerValidDate } from '../../../models';
import { DateOrTimeViewWithMeridiem } from '../../models';
export declare const usePicker: <TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, TSection extends FieldSection, TExternalProps extends UsePickerProps<TValue, TDate, TView, any, any, any>, TAdditionalProps extends {}>({ props, valueManager, valueType, wrapperVariant, additionalViewProps, validator, autoFocusView, rendererInterceptor, fieldRef, }: UsePickerParams<TValue, TDate, TView, TSection, TExternalProps, TAdditionalProps>) => UsePickerResponse<TValue, TView, TSection, InferError<TExternalProps>>;
