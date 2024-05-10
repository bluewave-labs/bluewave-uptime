import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import TextField from '@mui/material/TextField';
import { UseFieldInternalProps } from '../internals/hooks/useField';
import { MakeOptional } from '../internals/models/helpers';
import { BaseTimeValidationProps, TimeValidationProps } from '../internals/models/validation';
import { FieldSection, PickerValidDate, TimeValidationError, BuiltInFieldTextFieldProps } from '../models';
import { ExportedUseClearableFieldProps, UseClearableFieldSlots, UseClearableFieldSlotProps } from '../hooks/useClearableField';
export interface UseTimeFieldProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean> extends MakeOptional<UseFieldInternalProps<TDate | null, TDate, FieldSection, TEnableAccessibleFieldDOMStructure, TimeValidationError>, 'format'>, TimeValidationProps<TDate>, BaseTimeValidationProps, ExportedUseClearableFieldProps {
    /**
     * 12h/24h view for hour selection clock.
     * @default utils.is12HourCycleInCurrentLocale()
     */
    ampm?: boolean;
}
export type UseTimeFieldComponentProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean, TChildProps extends {}> = Omit<TChildProps, keyof UseTimeFieldProps<TDate, TEnableAccessibleFieldDOMStructure>> & UseTimeFieldProps<TDate, TEnableAccessibleFieldDOMStructure>;
export type TimeFieldProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false> = UseTimeFieldComponentProps<TDate, TEnableAccessibleFieldDOMStructure, BuiltInFieldTextFieldProps<TEnableAccessibleFieldDOMStructure>> & {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: TimeFieldSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: TimeFieldSlotProps<TDate, TEnableAccessibleFieldDOMStructure>;
};
export type TimeFieldOwnerState<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean> = TimeFieldProps<TDate, TEnableAccessibleFieldDOMStructure>;
export interface TimeFieldSlots extends UseClearableFieldSlots {
    /**
     * Form control with an input to render the value.
     * @default TextField from '@mui/material' or PickersTextField if `enableAccessibleFieldDOMStructure` is `true`.
     */
    textField?: React.ElementType;
}
export interface TimeFieldSlotProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean> extends UseClearableFieldSlotProps {
    textField?: SlotComponentProps<typeof TextField, {}, TimeFieldOwnerState<TDate, TEnableAccessibleFieldDOMStructure>>;
}
