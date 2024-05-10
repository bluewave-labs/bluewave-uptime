import * as React from 'react';
import { DigitalClockProps } from './DigitalClock.types';
import { PickerValidDate } from '../models';
type DigitalClockComponent = (<TDate extends PickerValidDate>(props: DigitalClockProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [TimePicker](https://mui.com/x/react-date-pickers/time-picker/)
 * - [DigitalClock](https://mui.com/x/react-date-pickers/digital-clock/)
 *
 * API:
 *
 * - [DigitalClock API](https://mui.com/x/api/date-pickers/digital-clock/)
 */
export declare const DigitalClock: DigitalClockComponent;
export {};
