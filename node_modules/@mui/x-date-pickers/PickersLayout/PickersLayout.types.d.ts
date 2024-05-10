import * as React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { SlotComponentProps } from '@mui/base/utils';
import { PickersActionBarProps } from '../PickersActionBar';
import { BaseToolbarProps, ExportedBaseToolbarProps } from '../internals/models/props/toolbar';
import { BaseTabsProps, ExportedBaseTabsProps } from '../internals/models/props/tabs';
import { UsePickerLayoutPropsResponseLayoutProps } from '../internals/hooks/usePicker/usePickerLayoutProps';
import { PickersLayoutClasses } from './pickersLayoutClasses';
import { DateOrTimeViewWithMeridiem, WrapperVariant } from '../internals/models/common';
import { PickersShortcutsProps } from '../PickersShortcuts';
import { ExportedPickersShortcutProps } from '../PickersShortcuts/PickersShortcuts';
import { PickerValidDate } from '../models';
export interface ExportedPickersLayoutSlots<TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem> {
    /**
     * Custom component for the action bar, it is placed below the picker views.
     * @default PickersActionBar
     */
    actionBar?: React.ElementType<PickersActionBarProps>;
    /**
     * Custom component for the shortcuts.
     * @default PickersShortcuts
     */
    shortcuts?: React.JSXElementConstructor<PickersShortcutsProps<TValue>>;
    /**
     * Custom component for wrapping the layout.
     * It wraps the toolbar, views, action bar, and shortcuts.
     */
    layout?: React.JSXElementConstructor<PickersLayoutProps<TValue, TDate, TView> & React.RefAttributes<HTMLDivElement>>;
}
interface PickersLayoutActionBarOwnerState<TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem> extends PickersLayoutProps<TValue, TDate, TView> {
    wrapperVariant: WrapperVariant;
}
interface PickersShortcutsOwnerState<TValue> extends PickersShortcutsProps<TValue> {
    wrapperVariant: WrapperVariant;
}
export interface ExportedPickersLayoutSlotProps<TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem> {
    /**
     * Props passed down to the action bar component.
     */
    actionBar?: SlotComponentProps<React.ComponentType<Omit<PickersActionBarProps, 'onAccept' | 'onClear' | 'onCancel' | 'onSetToday'>>, {}, PickersLayoutActionBarOwnerState<TValue, TDate, TView>>;
    /**
     * Props passed down to the shortcuts component.
     */
    shortcuts?: SlotComponentProps<React.ComponentType<PickersShortcutsProps<TValue>>, {}, PickersShortcutsOwnerState<TValue>>;
    /**
     * Props passed down to the layoutRoot component.
     */
    layout?: Partial<PickersLayoutProps<TValue, TDate, TView>>;
}
export interface PickersLayoutSlots<TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem> extends ExportedPickersLayoutSlots<TValue, TDate, TView> {
    /**
     * Tabs enabling toggling between views.
     */
    tabs?: React.ElementType<BaseTabsProps<TView>>;
    /**
     * Custom component for the toolbar.
     * It is placed above the picker views.
     */
    toolbar?: React.JSXElementConstructor<BaseToolbarProps<TValue, TView>>;
}
export interface PickersLayoutSlotProps<TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem> extends ExportedPickersLayoutSlotProps<TValue, TDate, TView> {
    /**
     * Props passed down to the tabs component.
     */
    tabs?: ExportedBaseTabsProps;
    /**
     * Props passed down to the toolbar component.
     */
    toolbar?: ExportedBaseToolbarProps;
}
export interface PickersLayoutProps<TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem> extends Omit<UsePickerLayoutPropsResponseLayoutProps<TValue, TView>, 'value'> {
    value?: TValue;
    className?: string;
    children?: React.ReactNode;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * Ref to pass to the root element
     */
    ref?: React.Ref<HTMLDivElement>;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PickersLayoutClasses>;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: PickersLayoutSlots<TValue, TDate, TView>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: PickersLayoutSlotProps<TValue, TDate, TView>;
}
export interface SubComponents<TValue> {
    toolbar: React.ReactElement<ExportedBaseToolbarProps> | null;
    content: React.ReactNode;
    tabs: React.ReactElement<ExportedBaseTabsProps> | null;
    actionBar: React.ReactElement<PickersActionBarProps>;
    shortcuts: React.ReactElement<ExportedPickersShortcutProps<TValue>> | null;
}
export {};
