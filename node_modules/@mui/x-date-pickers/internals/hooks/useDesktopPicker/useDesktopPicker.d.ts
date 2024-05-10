import * as React from 'react';
import { UseDesktopPickerParams, UseDesktopPickerProps } from './useDesktopPicker.types';
import { PickerValidDate } from '../../../models';
import { DateOrTimeViewWithMeridiem } from '../../models';
/**
 * Hook managing all the single-date desktop pickers:
 * - DesktopDatePicker
 * - DesktopDateTimePicker
 * - DesktopTimePicker
 */
export declare const useDesktopPicker: <TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, TEnableAccessibleFieldDOMStructure extends boolean, TExternalProps extends UseDesktopPickerProps<TDate, TView, TEnableAccessibleFieldDOMStructure, any, TExternalProps>>({ props, getOpenDialogAriaText, ...pickerParams }: UseDesktopPickerParams<TDate, TView, TEnableAccessibleFieldDOMStructure, TExternalProps>) => {
    renderPicker: () => React.JSX.Element;
};
