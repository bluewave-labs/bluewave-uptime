import { UseMobilePickerSlots, ExportedUseMobilePickerSlotProps, MobileOnlyPickerProps } from '../internals/hooks/useMobilePicker';
import { BaseTimePickerProps, BaseTimePickerSlots, BaseTimePickerSlotProps } from '../TimePicker/shared';
import { MakeOptional } from '../internals/models/helpers';
import { PickerValidDate, TimeView } from '../models';
import { TimeViewWithMeridiem } from '../internals/models';
export interface MobileTimePickerSlots<TDate extends PickerValidDate, TView extends TimeViewWithMeridiem> extends BaseTimePickerSlots<TDate>, MakeOptional<UseMobilePickerSlots<TDate, TView>, 'field'> {
}
export interface MobileTimePickerSlotProps<TDate extends PickerValidDate, TView extends TimeViewWithMeridiem, TEnableAccessibleFieldDOMStructure extends boolean> extends BaseTimePickerSlotProps, ExportedUseMobilePickerSlotProps<TDate, TView, TEnableAccessibleFieldDOMStructure> {
}
export interface MobileTimePickerProps<TDate extends PickerValidDate, TView extends TimeViewWithMeridiem = TimeView, TEnableAccessibleFieldDOMStructure extends boolean = false> extends BaseTimePickerProps<TDate, TView>, MobileOnlyPickerProps {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: MobileTimePickerSlots<TDate, TView>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: MobileTimePickerSlotProps<TDate, TView, TEnableAccessibleFieldDOMStructure>;
}
