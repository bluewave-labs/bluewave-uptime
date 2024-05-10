import { UseFieldParams, UseFieldResponse, UseFieldCommonForwardedProps, UseFieldInternalProps } from './useField.types';
import { PickerValidDate, FieldSection } from '../../../models';
export declare const useField: <TValue, TDate extends PickerValidDate, TSection extends FieldSection, TEnableAccessibleFieldDOMStructure extends boolean, TForwardedProps extends UseFieldCommonForwardedProps & (TEnableAccessibleFieldDOMStructure extends false ? import("./useField.types").UseFieldV6ForwardedProps : import("./useField.types").UseFieldV7ForwardedProps), TInternalProps extends UseFieldInternalProps<any, any, any, TEnableAccessibleFieldDOMStructure, any> & {
    minutesStep?: number | undefined;
}>(params: UseFieldParams<TValue, TDate, TSection, TEnableAccessibleFieldDOMStructure, TForwardedProps, TInternalProps>) => UseFieldResponse<TEnableAccessibleFieldDOMStructure, TForwardedProps>;
