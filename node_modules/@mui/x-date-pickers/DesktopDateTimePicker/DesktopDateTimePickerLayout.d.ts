import * as React from 'react';
import { PickersLayoutProps } from '../PickersLayout';
import { PickerValidDate } from '../models';
import { DateOrTimeViewWithMeridiem } from '../internals';
/**
 * @ignore - internal component.
 */
declare function DesktopDateTimePickerLayout<TValue, TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem>(props: PickersLayoutProps<TValue, TDate, TView>): React.JSX.Element;
declare namespace DesktopDateTimePickerLayout {
    var propTypes: any;
}
export { DesktopDateTimePickerLayout };
