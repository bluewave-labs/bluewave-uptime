import { TimeClockClasses } from './timeClockClasses';
import { PickersArrowSwitcherSlots, PickersArrowSwitcherSlotProps } from '../internals/components/PickersArrowSwitcher';
import { BaseClockProps, ExportedBaseClockProps } from '../internals/models/props/clock';
import { PickerValidDate, TimeView } from '../models';
import { TimeViewWithMeridiem } from '../internals/models';
export interface ExportedTimeClockProps<TDate extends PickerValidDate> extends ExportedBaseClockProps<TDate> {
    /**
     * Display ampm controls under the clock (instead of in the toolbar).
     * @default false
     */
    ampmInClock?: boolean;
}
export interface TimeClockSlots extends PickersArrowSwitcherSlots {
}
export interface TimeClockSlotProps extends PickersArrowSwitcherSlotProps {
}
export interface TimeClockProps<TDate extends PickerValidDate, TView extends TimeViewWithMeridiem = TimeView> extends ExportedTimeClockProps<TDate>, BaseClockProps<TDate, TView> {
    /**
     * Available views.
     * @default ['hours', 'minutes']
     */
    views?: readonly TView[];
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TimeClockClasses>;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: TimeClockSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: TimeClockSlotProps;
    showViewSwitcher?: boolean;
}
