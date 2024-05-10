import { MuiPickersAdapterContextValue } from '../../LocalizationProvider/LocalizationProvider';
import { PickerValidDate } from '../../models';
interface ValidationCommonProps<TError, TValue> {
    /**
     * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
     * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
     * This can be used to render appropriate form error.
     * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
     * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
     * @param {TError} reason The reason why the current value is not valid.
     * @param {TValue} value The invalid value.
     */
    onError?: (reason: TError, value: TValue) => void;
    value: TValue;
}
export type ValidationProps<TError, TValue, TValidationProps extends {}> = ValidationCommonProps<TError, TValue> & TValidationProps;
export type InferError<TProps> = TProps extends Pick<ValidationCommonProps<any, any>, 'onError'> ? Parameters<Exclude<TProps['onError'], undefined>>[0] : never;
export type Validator<TValue, TDate extends PickerValidDate, TError, TValidationProps> = (params: {
    adapter: MuiPickersAdapterContextValue<TDate>;
    value: TValue;
    props: Omit<TValidationProps, 'value' | 'onError'>;
}) => TError;
export declare function useValidation<TValue, TDate extends PickerValidDate, TError, TValidationProps extends {}>(props: ValidationProps<TError, TValue, TValidationProps>, validate: Validator<TValue, TDate, TError, TValidationProps>, isSameError: (a: TError, b: TError | null) => boolean, defaultErrorState: TError): TError;
export {};
