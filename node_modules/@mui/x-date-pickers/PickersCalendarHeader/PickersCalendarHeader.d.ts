import * as React from 'react';
import { PickersCalendarHeaderProps } from './PickersCalendarHeader.types';
import { PickerValidDate } from '../models';
type PickersCalendarHeaderComponent = (<TDate extends PickerValidDate>(props: PickersCalendarHeaderProps<TDate> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
 * - [DateRangeCalendar](https://mui.com/x/react-date-pickers/date-range-calendar/)
 * - [Custom slots and subcomponents](https://mui.com/x/react-date-pickers/custom-components/)
 *
 * API:
 *
 * - [PickersCalendarHeader API](https://mui.com/x/api/date-pickers/pickers-calendar-header/)
 */
declare const PickersCalendarHeader: PickersCalendarHeaderComponent;
export { PickersCalendarHeader };
