import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { DayCalendarSkeletonClasses } from './dayCalendarSkeletonClasses';
type HTMLDivProps = React.JSX.IntrinsicElements['div'];
export interface DayCalendarSkeletonProps extends HTMLDivProps {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DayCalendarSkeletonClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    ref?: React.Ref<HTMLDivElement>;
}
/**
 * Demos:
 *
 * - [DateCalendar](https://mui.com/x/react-date-pickers/date-calendar/)
 *
 * API:
 *
 * - [CalendarPickerSkeleton API](https://mui.com/x/api/date-pickers/calendar-picker-skeleton/)
 */
declare function DayCalendarSkeleton(inProps: DayCalendarSkeletonProps): React.JSX.Element;
declare namespace DayCalendarSkeleton {
    var propTypes: any;
}
export { DayCalendarSkeleton };
