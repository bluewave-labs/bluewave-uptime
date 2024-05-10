import * as React from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { SxProps } from '@mui/material/styles';
import type { BaseFieldProps } from '../internals/models/fields';
import type { ExportedUseClearableFieldProps, UseClearableFieldResponse, UseClearableFieldSlotProps, UseClearableFieldSlots } from '../hooks/useClearableField';
import { ExportedPickersSectionListProps, PickersSectionListRef } from '../PickersSectionList';
import type { UseFieldResponse } from '../internals/hooks/useField';
import type { PickersTextFieldProps } from '../PickersTextField';
import { PickerValidDate } from './pickers';
export type FieldSectionType = 'year' | 'month' | 'day' | 'weekDay' | 'hours' | 'minutes' | 'seconds' | 'meridiem' | 'empty';
export type FieldSectionContentType = 'digit' | 'digit-with-letter' | 'letter';
export type FieldValueType = 'date' | 'time' | 'date-time';
export interface FieldSection {
    /**
     * Value of the section, as rendered inside the input.
     * For example, in the date `May 25, 1995`, the value of the month section is "May".
     */
    value: string;
    /**
     * Format token used to parse the value of this section from the date object.
     * For example, in the format `MMMM D, YYYY`, the format of the month section is "MMMM".
     */
    format: string;
    /**
     * Maximum length of the value, only defined for "digit" sections.
     * Will be used to determine how many leading zeros should be added to the value.
     */
    maxLength: number | null;
    /**
     * Placeholder rendered when the value of this section is empty.
     */
    placeholder: string;
    /**
     * Type of the section.
     */
    type: FieldSectionType;
    /**
     * Type of content of the section.
     * Will determine if we should apply a digit-based editing or a letter-based editing.
     */
    contentType: FieldSectionContentType;
    /**
     * If `true`, the value of this section is supposed to have leading zeroes when parsed by the date library.
     * For example, the value `1` should be rendered as "01" instead of "1".
     */
    hasLeadingZerosInFormat: boolean;
    /**
     * If `true`, the value of this section is supposed to have leading zeroes when rendered in the input.
     * For example, the value `1` should be rendered as "01" instead of "1".
     */
    hasLeadingZerosInInput: boolean;
    /**
     * If `true`, the section value has been modified since the last time the sections were generated from a valid date.
     * When we can generate a valid date from the section, we don't directly pass it to `onChange`,
     * Otherwise, we would lose all the information contained in the original date, things like:
     * - time if the format does not contain it
     * - timezone / UTC
     *
     * To avoid losing that information, we transfer the values of the modified sections from the newly generated date to the original date.
     */
    modified: boolean;
    /**
     * Separator displayed before the value of the section in the input.
     * If it contains escaped characters, then it must not have the escaping characters.
     * For example, on Day.js, the `year` section of the format `YYYY [year]` has an end separator equal to `year` not `[year]`
     */
    startSeparator: string;
    /**
     * Separator displayed after the value of the section in the input.
     * If it contains escaped characters, then it must not have the escaping characters.
     * For example, on Day.js, the `year` section of the format `[year] YYYY` has a start separator equal to `[year]`
     */
    endSeparator: string;
}
export interface FieldRef<TSection extends FieldSection> {
    /**
     * Returns the sections of the current value.
     * @returns {TSection[]} The sections of the current value.
     */
    getSections: () => TSection[];
    /**
     * Returns the index of the active section (the first focused section).
     * If no section is active, returns `null`.
     * @returns {number | null} The index of the active section.
     */
    getActiveSectionIndex: () => number | null;
    /**
     * Updates the selected sections.
     * @param {FieldSelectedSections} selectedSections The sections to select.
     */
    setSelectedSections: (selectedSections: FieldSelectedSections) => void;
    /**
     * Focuses the field.
     * @param {FieldSelectedSections | FieldSectionType} newSelectedSection The section to select once focused.
     */
    focusField: (newSelectedSection?: number | FieldSectionType) => void;
    /**
     * Returns `true` if the focused is on the field input.
     * @returns {boolean} `true` if the field is focused.
     */
    isFieldFocused: () => boolean;
}
export type FieldSelectedSections = number | FieldSectionType | null | 'all';
interface BaseForwardedCommonSingleInputFieldProps extends ExportedUseClearableFieldProps {
    ref?: React.Ref<HTMLDivElement>;
    sx?: SxProps<any>;
    label?: React.ReactNode;
    id?: string;
    name?: string;
    onKeyDown?: React.KeyboardEventHandler;
    onBlur?: React.FocusEventHandler;
    focused?: boolean;
    InputProps?: {
        ref?: React.Ref<any>;
        endAdornment?: React.ReactNode;
        startAdornment?: React.ReactNode;
    };
    inputProps?: {
        'aria-label'?: string;
    };
    slots?: UseClearableFieldSlots;
    slotProps?: UseClearableFieldSlotProps & {
        textField?: {};
    };
}
interface BaseForwardedV6SingleInputFieldProps {
    inputRef?: React.Ref<HTMLInputElement>;
}
interface BaseForwardedV7SingleInputFieldProps {
    sectionListRef?: React.Ref<PickersSectionListRef>;
}
type BaseForwardedSingleInputFieldProps<TEnableAccessibleFieldDOMStructure extends boolean> = BaseForwardedCommonSingleInputFieldProps & (TEnableAccessibleFieldDOMStructure extends false ? BaseForwardedV6SingleInputFieldProps : BaseForwardedV7SingleInputFieldProps);
/**
 * Props the single input field can receive when used inside a picker.
 * Only contains what the MUI components are passing to the field,
 * not what users can pass using the `props.slotProps.field`.
 */
export type BaseSingleInputFieldProps<TValue, TDate extends PickerValidDate, TSection extends FieldSection, TEnableAccessibleFieldDOMStructure extends boolean, TError> = BaseFieldProps<TValue, TDate, TSection, TEnableAccessibleFieldDOMStructure, TError> & BaseForwardedSingleInputFieldProps<TEnableAccessibleFieldDOMStructure>;
/**
 * Props the text field receives when used with a single input picker.
 * Only contains what the MUI components are passing to the text field, not what users can pass using the `props.slotProps.field` and `props.slotProps.textField`.
 */
export type BaseSingleInputPickersTextFieldProps<TEnableAccessibleFieldDOMStructure extends boolean> = UseClearableFieldResponse<UseFieldResponse<TEnableAccessibleFieldDOMStructure, BaseForwardedSingleInputFieldProps<TEnableAccessibleFieldDOMStructure>>>;
/**
 * Props the built-in text field component can receive.
 */
export type BuiltInFieldTextFieldProps<TEnableAccessibleFieldDOMStructure extends boolean> = TEnableAccessibleFieldDOMStructure extends false ? Omit<TextFieldProps, 'autoComplete' | 'error' | 'maxRows' | 'minRows' | 'multiline' | 'placeholder' | 'rows' | 'select' | 'SelectProps' | 'type'> : Partial<Omit<PickersTextFieldProps, keyof ExportedPickersSectionListProps>>;
export {};
