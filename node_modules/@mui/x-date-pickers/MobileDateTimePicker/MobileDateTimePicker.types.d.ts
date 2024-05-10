import { UseMobilePickerSlots, ExportedUseMobilePickerSlotProps, MobileOnlyPickerProps } from '../internals/hooks/useMobilePicker';
import { BaseDateTimePickerProps, BaseDateTimePickerSlots, BaseDateTimePickerSlotProps } from '../DateTimePicker/shared';
import { MakeOptional } from '../internals/models/helpers';
import { DateOrTimeView, PickerValidDate } from '../models';
import { DateOrTimeViewWithMeridiem } from '../internals/models';
export interface MobileDateTimePickerSlots<TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem> extends BaseDateTimePickerSlots<TDate>, MakeOptional<UseMobilePickerSlots<TDate, TView>, 'field'> {
}
export interface MobileDateTimePickerSlotProps<TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, TEnableAccessibleFieldDOMStructure extends boolean> extends BaseDateTimePickerSlotProps<TDate>, ExportedUseMobilePickerSlotProps<TDate, TView, TEnableAccessibleFieldDOMStructure> {
}
export interface MobileDateTimePickerProps<TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem = DateOrTimeView, TEnableAccessibleFieldDOMStructure extends boolean = false> extends BaseDateTimePickerProps<TDate, TView>, MobileOnlyPickerProps {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: MobileDateTimePickerSlots<TDate, TView>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: MobileDateTimePickerSlotProps<TDate, TView, TEnableAccessibleFieldDOMStructure>;
}
