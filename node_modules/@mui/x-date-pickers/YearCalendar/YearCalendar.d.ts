import * as React from 'react';
import { YearCalendarProps } from './YearCalendar.types';
import { PickerValidDate } from '../models';
type YearCalendarComponent = (<TDate extends PickerValidDate>(props: YearCalendarProps<TDate>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
 *
 * API:
 *
 * - [YearCalendar API](https://mui.com/x/api/date-pickers/year-calendar/)
 */
export declare const YearCalendar: YearCalendarComponent;
export {};
