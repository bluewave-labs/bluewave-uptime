import * as React from 'react';
import { BaseToolbarProps, ExportedBaseToolbarProps } from '../internals/models/props/toolbar';
import { DateTimePickerToolbarClasses } from './dateTimePickerToolbarClasses';
import { DateOrTimeViewWithMeridiem, WrapperVariant } from '../internals/models';
import { MakeOptional } from '../internals/models/helpers';
import { PickerValidDate } from '../models';
export interface ExportedDateTimePickerToolbarProps extends ExportedBaseToolbarProps {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DateTimePickerToolbarClasses>;
}
export interface DateTimePickerToolbarProps<TDate extends PickerValidDate> extends ExportedDateTimePickerToolbarProps, MakeOptional<BaseToolbarProps<TDate | null, DateOrTimeViewWithMeridiem>, 'view'> {
    toolbarVariant?: WrapperVariant;
    /**
     * If provided, it will be used instead of `dateTimePickerToolbarTitle` from localization.
     */
    toolbarTitle?: React.ReactNode;
    ampm?: boolean;
    ampmInClock?: boolean;
}
/**
 * Demos:
 *
 * - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
 * - [Custom components](https://mui.com/x/react-date-pickers/custom-components/)
 *
 * API:
 *
 * - [DateTimePickerToolbar API](https://mui.com/x/api/date-pickers/date-time-picker-toolbar/)
 */
declare function DateTimePickerToolbar<TDate extends PickerValidDate>(inProps: DateTimePickerToolbarProps<TDate>): React.JSX.Element;
declare namespace DateTimePickerToolbar {
    var propTypes: any;
}
export { DateTimePickerToolbar };
