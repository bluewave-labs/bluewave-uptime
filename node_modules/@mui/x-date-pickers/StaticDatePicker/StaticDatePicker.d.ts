import * as React from 'react';
import { StaticDatePickerProps } from './StaticDatePicker.types';
import { PickerValidDate } from '../models';
type StaticDatePickerComponent = (<TDate extends PickerValidDate>(props: StaticDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
 * - [Validation](https://mui.com/x/react-date-pickers/validation/)
 *
 * API:
 *
 * - [StaticDatePicker API](https://mui.com/x/api/date-pickers/static-date-picker/)
 */
declare const StaticDatePicker: StaticDatePickerComponent;
export { StaticDatePicker };
