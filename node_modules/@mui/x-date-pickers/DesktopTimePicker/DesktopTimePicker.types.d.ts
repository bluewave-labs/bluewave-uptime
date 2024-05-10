import { UseDesktopPickerSlots, ExportedUseDesktopPickerSlotProps, DesktopOnlyPickerProps } from '../internals/hooks/useDesktopPicker';
import { BaseTimePickerProps, BaseTimePickerSlots, BaseTimePickerSlotProps } from '../TimePicker/shared';
import { MakeOptional } from '../internals/models/helpers';
import { TimeViewWithMeridiem } from '../internals/models';
import { DesktopOnlyTimePickerProps } from '../internals/models/props/clock';
import { DigitalClockSlots, DigitalClockSlotProps } from '../DigitalClock';
import { MultiSectionDigitalClockSlots, MultiSectionDigitalClockSlotProps } from '../MultiSectionDigitalClock';
import { PickerValidDate, TimeView } from '../models';
export interface DesktopTimePickerSlots<TDate extends PickerValidDate> extends BaseTimePickerSlots<TDate>, MakeOptional<UseDesktopPickerSlots<TDate, TimeViewWithMeridiem>, 'field' | 'openPickerIcon'>, DigitalClockSlots, MultiSectionDigitalClockSlots {
}
export interface DesktopTimePickerSlotProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean> extends BaseTimePickerSlotProps, ExportedUseDesktopPickerSlotProps<TDate, TimeViewWithMeridiem, TEnableAccessibleFieldDOMStructure>, DigitalClockSlotProps, MultiSectionDigitalClockSlotProps {
}
export interface DesktopTimePickerProps<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false> extends BaseTimePickerProps<TDate, TimeViewWithMeridiem>, DesktopOnlyPickerProps, DesktopOnlyTimePickerProps<TDate> {
    /**
     * Available views.
     */
    views?: readonly TimeView[];
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: DesktopTimePickerSlots<TDate>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: DesktopTimePickerSlotProps<TDate, TEnableAccessibleFieldDOMStructure>;
}
