import * as React from 'react';
import { SlotComponentProps } from '@mui/base/utils';
import MenuItem from '@mui/material/MenuItem';
import { DigitalClockClasses } from './digitalClockClasses';
import { BaseClockProps, DigitalClockOnlyProps, ExportedBaseClockProps } from '../internals/models/props/clock';
import { PickerValidDate, TimeView } from '../models';
export interface ExportedDigitalClockProps<TDate extends PickerValidDate> extends ExportedBaseClockProps<TDate>, DigitalClockOnlyProps {
}
export interface DigitalClockSlots {
    /**
     * Component responsible for rendering a single digital clock item.
     * @default MenuItem from '@mui/material'
     */
    digitalClockItem?: React.ElementType;
}
export interface DigitalClockSlotProps {
    digitalClockItem?: SlotComponentProps<typeof MenuItem, {}, Record<string, any>>;
}
export interface DigitalClockProps<TDate extends PickerValidDate> extends ExportedDigitalClockProps<TDate>, BaseClockProps<TDate, Extract<TimeView, 'hours'>> {
    /**
     * Available views.
     * @default ['hours']
     */
    views?: readonly 'hours'[];
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DigitalClockClasses>;
    /**
     * Overrideable component slots.
     * @default {}
     */
    slots?: DigitalClockSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: DigitalClockSlotProps;
}
