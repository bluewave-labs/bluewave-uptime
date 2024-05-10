import * as React from 'react';
import { DateTimeFieldProps } from './DateTimeField.types';
import { PickerValidDate } from '../models';
type DateTimeFieldComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: DateTimeFieldProps<TDate, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
/**
 * Demos:
 *
 * - [DateTimeField](http://mui.com/x/react-date-pickers/date-time-field/)
 * - [Fields](https://mui.com/x/react-date-pickers/fields/)
 *
 * API:
 *
 * - [DateTimeField API](https://mui.com/x/api/date-pickers/date-time-field/)
 */
declare const DateTimeField: DateTimeFieldComponent;
export { DateTimeField };
