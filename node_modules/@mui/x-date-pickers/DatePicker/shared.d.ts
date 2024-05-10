import * as React from 'react';
import { DefaultizedProps } from '../internals/models/helpers';
import { DateCalendarSlots, DateCalendarSlotProps, ExportedDateCalendarProps } from '../DateCalendar/DateCalendar.types';
import { DateValidationError, DateView, PickerValidDate } from '../models';
import { BasePickerInputProps } from '../internals/models/props/basePickerProps';
import { BaseDateValidationProps } from '../internals/models/validation';
import { LocalizedComponent } from '../locales/utils/pickersLocaleTextApi';
import { DatePickerToolbarProps, ExportedDatePickerToolbarProps } from './DatePickerToolbar';
import { PickerViewRendererLookup } from '../internals/hooks/usePicker/usePickerViews';
import { DateViewRendererProps } from '../dateViewRenderers';
export interface BaseDatePickerSlots<TDate extends PickerValidDate> extends DateCalendarSlots<TDate> {
    /**
     * Custom component for the toolbar rendered above the views.
     * @default DatePickerToolbar
     */
    toolbar?: React.JSXElementConstructor<DatePickerToolbarProps<TDate>>;
}
export interface BaseDatePickerSlotProps<TDate extends PickerValidDate> extends DateCalendarSlotProps<TDate> {
    toolbar?: ExportedDatePickerToolbarProps;
}
export type DatePickerViewRenderers<TDate extends PickerValidDate, TView extends DateView, TAdditionalProps extends {} = {}> = PickerViewRendererLookup<TDate | null, TView, DateViewRendererProps<TDate, TView>, TAdditionalProps>;
export interface BaseDatePickerProps<TDate extends PickerValidDate> extends BasePickerInputProps<TDate | null, TDate, DateView, DateValidationError>, ExportedDateCalendarProps<TDate> {
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: BaseDatePickerSlots<TDate>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: BaseDatePickerSlotProps<TDate>;
    /**
     * Define custom view renderers for each section.
     * If `null`, the section will only have field editing.
     * If `undefined`, internally defined view will be used.
     */
    viewRenderers?: Partial<DatePickerViewRenderers<TDate, DateView>>;
}
type UseDatePickerDefaultizedProps<TDate extends PickerValidDate, Props extends BaseDatePickerProps<TDate>> = LocalizedComponent<TDate, DefaultizedProps<Props, 'views' | 'openTo' | keyof BaseDateValidationProps<TDate>>>;
export declare function useDatePickerDefaultizedProps<TDate extends PickerValidDate, Props extends BaseDatePickerProps<TDate>>(props: Props, name: string): UseDatePickerDefaultizedProps<TDate, Props>;
export {};
