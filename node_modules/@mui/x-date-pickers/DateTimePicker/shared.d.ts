import * as React from 'react';
import { DefaultizedProps } from '../internals/models/helpers';
import { DateTimeValidationError, PickerValidDate } from '../models';
import { DateCalendarSlots, DateCalendarSlotProps, ExportedDateCalendarProps } from '../DateCalendar/DateCalendar.types';
import { TimeClockSlots, TimeClockSlotProps } from '../TimeClock/TimeClock.types';
import { BasePickerInputProps } from '../internals/models/props/basePickerProps';
import { DateTimePickerTabsProps, ExportedDateTimePickerTabsProps } from './DateTimePickerTabs';
import { BaseDateValidationProps, BaseTimeValidationProps, DateTimeValidationProps } from '../internals/models/validation';
import { LocalizedComponent } from '../locales/utils/pickersLocaleTextApi';
import { DateTimePickerToolbarProps, ExportedDateTimePickerToolbarProps } from './DateTimePickerToolbar';
import { PickerViewRendererLookup } from '../internals/hooks/usePicker/usePickerViews';
import { DateViewRendererProps } from '../dateViewRenderers';
import { TimeViewRendererProps } from '../timeViewRenderers';
import { BaseClockProps, ExportedBaseClockProps } from '../internals/models/props/clock';
import { DateOrTimeViewWithMeridiem, TimeViewWithMeridiem } from '../internals/models';
export interface BaseDateTimePickerSlots<TDate extends PickerValidDate> extends DateCalendarSlots<TDate>, TimeClockSlots {
    /**
     * Tabs enabling toggling between date and time pickers.
     * @default DateTimePickerTabs
     */
    tabs?: React.ElementType<DateTimePickerTabsProps>;
    /**
     * Custom component for the toolbar rendered above the views.
     * @default DateTimePickerToolbar
     */
    toolbar?: React.JSXElementConstructor<DateTimePickerToolbarProps<TDate>>;
}
export interface BaseDateTimePickerSlotProps<TDate extends PickerValidDate> extends DateCalendarSlotProps<TDate>, TimeClockSlotProps {
    /**
     * Props passed down to the tabs component.
     */
    tabs?: ExportedDateTimePickerTabsProps;
    /**
     * Props passed down to the toolbar component.
     */
    toolbar?: ExportedDateTimePickerToolbarProps;
}
export type DateTimePickerViewRenderers<TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, TAdditionalProps extends {} = {}> = PickerViewRendererLookup<TDate | null, TView, Omit<DateViewRendererProps<TDate, TView>, 'slots' | 'slotProps'> & Omit<TimeViewRendererProps<TimeViewWithMeridiem, BaseClockProps<TDate, TimeViewWithMeridiem>>, 'slots' | 'slotProps'>, TAdditionalProps>;
export interface BaseDateTimePickerProps<TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem> extends BasePickerInputProps<TDate | null, TDate, TView, DateTimeValidationError>, Omit<ExportedDateCalendarProps<TDate>, 'onViewChange'>, ExportedBaseClockProps<TDate>, DateTimeValidationProps<TDate> {
    /**
     * Display ampm controls under the clock (instead of in the toolbar).
     * @default true on desktop, false on mobile
     */
    ampmInClock?: boolean;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: BaseDateTimePickerSlots<TDate>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: BaseDateTimePickerSlotProps<TDate>;
    /**
     * Define custom view renderers for each section.
     * If `null`, the section will only have field editing.
     * If `undefined`, internally defined view will be used.
     */
    viewRenderers?: Partial<DateTimePickerViewRenderers<TDate, TView>>;
}
type UseDateTimePickerDefaultizedProps<TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, Props extends BaseDateTimePickerProps<TDate, TView>> = LocalizedComponent<TDate, DefaultizedProps<Props, 'views' | 'openTo' | 'orientation' | 'ampm' | keyof BaseDateValidationProps<TDate> | keyof BaseTimeValidationProps>>;
export declare function useDateTimePickerDefaultizedProps<TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, Props extends BaseDateTimePickerProps<TDate, TView>>(props: Props, name: string): UseDateTimePickerDefaultizedProps<TDate, TView, Props>;
export {};
