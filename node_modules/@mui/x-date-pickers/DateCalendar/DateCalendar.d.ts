import * as React from 'react';
import { DateCalendarProps } from './DateCalendar.types';
import { PickerValidDate } from '../models';
type DateCalendarComponent = (<TDate extends PickerValidDate>(props: DateCalendarProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DatePicker](https://mui.com/x/react-date-pickers/date-picker/)
 * - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
 * - [Validation](https://mui.com/x/react-date-pickers/validation/)
 *
 * API:
 *
 * - [DateCalendar API](https://mui.com/x/api/date-pickers/date-calendar/)
 */
export declare const DateCalendar: DateCalendarComponent;
export {};
