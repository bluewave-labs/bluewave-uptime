import * as React from 'react';
import { BoxProps } from '@mui/material/Box';
import { PickersSectionListProps } from '../../PickersSectionList';
export interface PickersInputPropsUsedByField extends Pick<PickersSectionListProps, 'elements' | 'sectionListRef' | 'contentEditable' | 'tabIndex'> {
    /**
     * Is `true` if the current values equals the empty value.
     * For a single item value, it means that `value === null`
     * For a range value, it means that `value === [null, null]`
     */
    areAllSectionsEmpty: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
    onInput: React.FormEventHandler<HTMLDivElement>;
    onPaste: React.ClipboardEventHandler<HTMLDivElement>;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label?: React.ReactNode;
    id?: string;
    fullWidth?: boolean;
    readOnly?: boolean;
    name?: string;
    inputProps?: React.HTMLAttributes<HTMLInputElement> & {
        ref?: React.Ref<HTMLInputElement>;
    };
    inputRef?: React.Ref<HTMLInputElement>;
}
export interface PickersInputBaseProps extends Omit<BoxProps, keyof PickersInputPropsUsedByField>, PickersInputPropsUsedByField {
    ownerState?: any;
    margin?: 'dense' | 'none' | 'normal';
    renderSuffix?: (state: {
        disabled?: boolean;
        error?: boolean;
        filled?: boolean;
        focused?: boolean;
        margin?: 'dense' | 'none' | 'normal';
        required?: boolean;
        adornedStart?: boolean;
    }) => React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
    /**
     * The components used for each slot inside.
     *
     * @default {}
     */
    slots?: {
        root?: React.ElementType;
        input?: React.ElementType;
    };
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: {
        root?: any;
    };
}
