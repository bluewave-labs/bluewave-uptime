import * as React from 'react';
import { FormControlProps } from '@mui/material/FormControl';
import { FormHelperTextProps } from '@mui/material/FormHelperText';
import { InputLabelProps } from '@mui/material/InputLabel';
import { TextFieldVariants } from '@mui/material/TextField';
import { PickersInputPropsUsedByField } from './PickersInputBase/PickersInputBase.types';
import { PickersInputProps } from './PickersInput';
import { PickersOutlinedInputProps } from './PickersOutlinedInput';
import { PickersFilledInputProps } from './PickersFilledInput';
interface PickersTextFieldPropsUsedByField {
    onFocus: React.FocusEventHandler<HTMLDivElement>;
    onBlur: React.FocusEventHandler<HTMLDivElement>;
    disabled: boolean;
    error: boolean;
}
export interface PickersBaseTextFieldProps extends PickersInputPropsUsedByField, PickersTextFieldPropsUsedByField, Omit<FormControlProps, keyof PickersInputPropsUsedByField | keyof PickersTextFieldPropsUsedByField> {
    FormHelperTextProps?: Partial<FormHelperTextProps>;
    InputLabelProps?: Partial<InputLabelProps>;
    /**
     * The helper text content.
     */
    helperText?: React.ReactNode;
}
export interface PickersStandardTextFieldProps extends PickersBaseTextFieldProps {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: 'standard';
    /**
     * Props applied to the Input element.
     * It will be a [`FilledInput`](/material-ui/api/filled-input/),
     * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
     * component depending on the `variant` prop value.
     */
    InputProps?: Partial<PickersInputProps>;
}
export interface PickersOutlinedTextFieldProps extends PickersBaseTextFieldProps {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: 'outlined';
    /**
     * Props applied to the Input element.
     * It will be a [`FilledInput`](/material-ui/api/filled-input/),
     * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
     * component depending on the `variant` prop value.
     */
    InputProps?: Partial<PickersOutlinedInputProps>;
}
export interface PickersFilledTextFieldProps extends PickersBaseTextFieldProps {
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: 'filled';
    /**
     * Props applied to the Input element.
     * It will be a [`FilledInput`](/material-ui/api/filled-input/),
     * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
     * component depending on the `variant` prop value.
     */
    InputProps?: Partial<PickersFilledInputProps>;
}
export type PickersTextFieldProps<Variant extends TextFieldVariants = TextFieldVariants> = Variant extends 'filled' ? PickersFilledTextFieldProps : Variant extends 'standard' ? PickersStandardTextFieldProps : PickersOutlinedTextFieldProps;
export {};
