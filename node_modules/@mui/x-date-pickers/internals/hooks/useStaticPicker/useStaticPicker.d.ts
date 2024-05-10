import * as React from 'react';
import { UseStaticPickerParams, UseStaticPickerProps } from './useStaticPicker.types';
import { PickerValidDate } from '../../../models';
import { DateOrTimeViewWithMeridiem } from '../../models';
/**
 * Hook managing all the single-date static pickers:
 * - StaticDatePicker
 * - StaticDateTimePicker
 * - StaticTimePicker
 */
export declare const useStaticPicker: <TDate extends PickerValidDate, TView extends DateOrTimeViewWithMeridiem, TExternalProps extends UseStaticPickerProps<TDate, TView, any, TExternalProps>>({ props, ref, ...pickerParams }: UseStaticPickerParams<TDate, TView, TExternalProps>) => {
    renderPicker: () => React.JSX.Element;
};
