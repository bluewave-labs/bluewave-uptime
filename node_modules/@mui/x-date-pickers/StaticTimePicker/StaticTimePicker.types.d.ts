import { BaseTimePickerProps, BaseTimePickerSlots, BaseTimePickerSlotProps } from '../TimePicker/shared';
import { StaticOnlyPickerProps, UseStaticPickerSlots, UseStaticPickerSlotProps } from '../internals/hooks/useStaticPicker';
import { MakeOptional } from '../internals/models/helpers';
import { PickerValidDate, TimeView } from '../models';
export interface StaticTimePickerSlots<TDate extends PickerValidDate> extends BaseTimePickerSlots<TDate>, UseStaticPickerSlots<TDate, TimeView> {
}
export interface StaticTimePickerSlotProps<TDate extends PickerValidDate> extends BaseTimePickerSlotProps, UseStaticPickerSlotProps<TDate, TimeView> {
}
export interface StaticTimePickerProps<TDate extends PickerValidDate> extends BaseTimePickerProps<TDate, TimeView>, MakeOptional<StaticOnlyPickerProps, 'displayStaticWrapperAs'> {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: StaticTimePickerSlots<TDate>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: StaticTimePickerSlotProps<TDate>;
}
