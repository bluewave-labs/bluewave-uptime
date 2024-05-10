import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import MuiIconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/system';
import { ClearIcon } from '../icons';
export interface ExportedUseClearableFieldProps {
    /**
     * If `true`, a clear button will be shown in the field allowing value clearing.
     * @default false
     */
    clearable?: boolean;
    /**
     * Callback fired when the clear button is clicked.
     */
    onClear?: React.MouseEventHandler;
}
export interface UseClearableFieldSlots {
    /**
     * Icon to display inside the clear button.
     * @default ClearIcon
     */
    clearIcon?: React.ElementType;
    /**
     * Button to clear the value.
     * @default IconButton
     */
    clearButton?: React.ElementType;
}
export interface UseClearableFieldSlotProps {
    clearIcon?: SlotComponentProps<typeof ClearIcon, {}, {}>;
    clearButton?: SlotComponentProps<typeof MuiIconButton, {}, {}>;
}
interface UseClearableFieldProps extends ExportedUseClearableFieldProps {
    InputProps?: {
        endAdornment?: React.ReactNode;
    };
    sx?: SxProps<any>;
    slots?: UseClearableFieldSlots;
    slotProps?: UseClearableFieldSlotProps;
}
export type UseClearableFieldResponse<TFieldProps extends UseClearableFieldProps> = Omit<TFieldProps, 'clearable' | 'onClear' | 'slots' | 'slotProps'>;
export declare const useClearableField: <TFieldProps extends UseClearableFieldProps>(props: TFieldProps) => UseClearableFieldResponse<TFieldProps>;
export {};
