import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import MenuItem from '@mui/material/MenuItem';
import { MultiSectionDigitalClockClasses } from './multiSectionDigitalClockClasses';
import { BaseClockProps, ExportedBaseClockProps, MultiSectionDigitalClockOnlyProps } from '../internals/models/props/clock';
import { MultiSectionDigitalClockSectionProps } from './MultiSectionDigitalClockSection';
import { TimeViewWithMeridiem } from '../internals/models';
import { PickerValidDate } from '../models';
export interface MultiSectionDigitalClockOption<TValue> {
    isDisabled?: (value: TValue) => boolean;
    isSelected: (value: TValue) => boolean;
    isFocused: (value: TValue) => boolean;
    label: string;
    value: TValue;
    ariaLabel: string;
}
export interface ExportedMultiSectionDigitalClockProps<TDate extends PickerValidDate> extends ExportedBaseClockProps<TDate>, MultiSectionDigitalClockOnlyProps {
}
export interface MultiSectionDigitalClockViewProps<TValue> extends Pick<MultiSectionDigitalClockSectionProps<TValue>, 'onChange' | 'items'> {
}
export interface MultiSectionDigitalClockSlots {
    /**
     * Component responsible for rendering a single multi section digital clock section item.
     * @default MenuItem from '@mui/material'
     */
    digitalClockSectionItem?: React.ElementType;
}
export interface MultiSectionDigitalClockSlotProps {
    digitalClockSectionItem?: SlotComponentProps<typeof MenuItem, {}, Record<string, any>>;
}
export interface MultiSectionDigitalClockProps<TDate extends PickerValidDate> extends ExportedMultiSectionDigitalClockProps<TDate>, BaseClockProps<TDate, TimeViewWithMeridiem> {
    /**
     * Available views.
     * @default ['hours', 'minutes']
     */
    views?: readonly TimeViewWithMeridiem[];
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<MultiSectionDigitalClockClasses>;
    /**
     * Overrideable component slots.
     * @default {}
     */
    slots?: MultiSectionDigitalClockSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: MultiSectionDigitalClockSlotProps;
}
