import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import TextField from '@mui/material/TextField';
import { DateTimeValidationError, FieldSection, PickerValidDate, BuiltInFieldTextFieldProps } from '../models';
import { UseFieldInternalProps } from '../internals/hooks/useField';
import { MakeOptional } from '../internals/models/helpers';
import { BaseDateValidationProps, BaseTimeValidationProps, DateTimeValidationProps, DayValidationProps, MonthValidationProps, TimeValidationProps, YearValidationProps } from '../internals/models/validation';
import { ExportedUseClearableFieldProps, UseClearableFieldSlots, UseClearableFieldSlotProps } from '../hooks/useClearableField';
export interface UseDateTimeFieldProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean> extends MakeOptional<UseFieldInternalProps<TDate | null, TDate, FieldSection, TEnableAccessibleFieldDOMStructure, DateTimeValidationError>, 'format'>, DayValidationProps<TDate>, MonthValidationProps<TDate>, YearValidationProps<TDate>, BaseDateValidationProps<TDate>, TimeValidationProps<TDate>, BaseTimeValidationProps, DateTimeValidationProps<TDate>, ExportedUseClearableFieldProps {
    /**
     * 12h/24h view for hour selection clock.
     * @default utils.is12HourCycleInCurrentLocale()
     */
    ampm?: boolean;
}
export type UseDateTimeFieldComponentProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean, TChildProps extends {}> = Omit<TChildProps, keyof UseDateTimeFieldProps<TDate, TEnableAccessibleFieldDOMStructure>> & UseDateTimeFieldProps<TDate, TEnableAccessibleFieldDOMStructure>;
export type DateTimeFieldProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false> = UseDateTimeFieldComponentProps<TDate, TEnableAccessibleFieldDOMStructure, BuiltInFieldTextFieldProps<TEnableAccessibleFieldDOMStructure>> & {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: DateTimeFieldSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: DateTimeFieldSlotProps<TDate, TEnableAccessibleFieldDOMStructure>;
};
export type DateTimeFieldOwnerState<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean> = DateTimeFieldProps<TDate, TEnableAccessibleFieldDOMStructure>;
export interface DateTimeFieldSlots extends UseClearableFieldSlots {
    /**
     * Form control with an input to render the value.
     * @default TextField from '@mui/material' or PickersTextField if `enableAccessibleFieldDOMStructure` is `true`.
     */
    textField?: React.ElementType;
}
export interface DateTimeFieldSlotProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean> extends UseClearableFieldSlotProps {
    textField?: SlotComponentProps<typeof TextField, {}, DateTimeFieldOwnerState<TDate, TEnableAccessibleFieldDOMStructure>>;
}
