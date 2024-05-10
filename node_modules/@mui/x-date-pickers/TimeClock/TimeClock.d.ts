import * as React from 'react';
import { PickerValidDate } from '../models';
import { TimeClockProps } from './TimeClock.types';
type TimeClockComponent = (<TDate extends PickerValidDate>(props: TimeClockProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
 * - [TimeClock](https://mui.com/x/react-date-pickers/time-clock/)
 *
 * API:
 *
 * - [TimeClock API](https://mui.com/x/api/date-pickers/time-clock/)
 */
export declare const TimeClock: TimeClockComponent;
export {};
