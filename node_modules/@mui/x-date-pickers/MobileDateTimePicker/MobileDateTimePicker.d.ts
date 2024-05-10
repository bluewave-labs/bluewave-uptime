import * as React from 'react';
import { MobileDateTimePickerProps } from './MobileDateTimePicker.types';
import { DateOrTimeView, PickerValidDate } from '../models';
type MobileDateTimePickerComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: MobileDateTimePickerProps<TDate, DateOrTimeView, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateTimePicker](https://mui.com/x/react-date-pickers/date-time-picker/)
 * - [Validation](https://mui.com/x/react-date-pickers/validation/)
 *
 * API:
 *
 * - [MobileDateTimePicker API](https://mui.com/x/api/date-pickers/mobile-date-time-picker/)
 */
declare const MobileDateTimePicker: MobileDateTimePickerComponent;
export { MobileDateTimePicker };
