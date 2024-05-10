import { UsePickerValueLayoutResponse } from './usePickerValue.types';
import { UsePickerViewsLayoutResponse } from './usePickerViews';
import { DateOrTimeViewWithMeridiem, WrapperVariant } from '../../models/common';
/**
 * Props used to create the layout of the views.
 * Those props are exposed on all the pickers.
 */
export interface UsePickerLayoutProps {
    disabled?: boolean;
    readOnly?: boolean;
    /**
     * Force rendering in particular orientation.
     */
    orientation?: 'portrait' | 'landscape';
}
export interface UsePickerLayoutPropsResponseLayoutProps<TValue, TView extends DateOrTimeViewWithMeridiem> extends UsePickerValueLayoutResponse<TValue>, UsePickerViewsLayoutResponse<TView>, UsePickerLayoutProps {
    isLandscape: boolean;
    wrapperVariant: WrapperVariant;
    isValid: (value: TValue) => boolean;
}
export interface UsePickerLayoutPropsResponse<TValue, TView extends DateOrTimeViewWithMeridiem> {
    layoutProps: UsePickerLayoutPropsResponseLayoutProps<TValue, TView>;
}
export interface UsePickerLayoutPropsParams<TValue, TView extends DateOrTimeViewWithMeridiem> {
    props: UsePickerLayoutProps;
    propsFromPickerValue: UsePickerValueLayoutResponse<TValue>;
    propsFromPickerViews: UsePickerViewsLayoutResponse<TView>;
    wrapperVariant: WrapperVariant;
}
/**
 * Prepare the props for the view layout (managed by `PickersLayout`)
 */
export declare const usePickerLayoutProps: <TValue, TView extends DateOrTimeViewWithMeridiem>({ props, propsFromPickerValue, propsFromPickerViews, wrapperVariant, }: UsePickerLayoutPropsParams<TValue, TView>) => UsePickerLayoutPropsResponse<TValue, TView>;
