import * as React from 'react';
import { MobileTimePickerProps } from './MobileTimePicker.types';
import { PickerValidDate, TimeView } from '../models';
type MobileTimePickerComponent = (<TDate extends PickerValidDate, TEnableAccessibleFieldDOMStructure extends boolean = false>(props: MobileTimePickerProps<TDate, TimeView, TEnableAccessibleFieldDOMStructure> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
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
 * - [MobileTimePicker API](https://mui.com/x/api/date-pickers/mobile-time-picker/)
 */
declare const MobileTimePicker: MobileTimePickerComponent;
export { MobileTimePicker };
