import * as React from 'react';
import { UseMobilePickerParams, UseMobilePickerProps } from './useMobilePicker.types';
import { PickerValidDate } from '../../../models';
import { DateOrTimeViewWithMeridiem } from '../../models';
/**
 * Hook managing all the single-date mobile pickers:
 * - MobileDatePicker
 * - MobileDateTimePicker
 * - MobileTimePicker
 */
export declare const useMobilePicker: <TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, TEnableAccessibleFieldDOMStructure extends boolean, TExternalProps extends UseMobilePickerProps<TDate, TView, TEnableAccessibleFieldDOMStructure, any, TExternalProps>>({ props, getOpenDialogAriaText, ...pickerParams }: UseMobilePickerParams<TDate, TView, TEnableAccessibleFieldDOMStructure, TExternalProps>) => {
    renderPicker: () => React.JSX.Element;
};
