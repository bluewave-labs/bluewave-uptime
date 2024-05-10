import * as React from 'react';
import { TimePickerProps } from './TimePicker.types';
import { PickerValidDate } from '../models';
type TimePickerComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: TimePickerProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
 * - [Validation](https://mui.com/x/react-date-pickers/validation/)
 *
 * API:
 *
 * - [TimePicker API](https://mui.com/x/api/date-pickers/time-picker/)
 */
declare const TimePicker: TimePickerComponent;
export { TimePicker };
