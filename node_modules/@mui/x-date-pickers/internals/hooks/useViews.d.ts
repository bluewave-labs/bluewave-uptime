import type { PickerSelectionState } from './usePicker';
import { MakeOptional } from '../models/helpers';
import { DateOrTimeViewWithMeridiem } from '../models';
import { PickerValidDate } from '../../models';
export type PickerOnChangeFn<TDate extends PickerValidDate> = (date: TDate | null, selectionState?: PickerSelectionState) => void;
export interface UseViewsOptions<TValue, TView extends DateOrTimeViewWithMeridiem> {
    /**
     * Callback fired when the value changes.
     * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
     * @template TView The view type. Will be one of date or time views.
     * @param {TValue} value The new value.
     * @param {PickerSelectionState | undefined} selectionState Indicates if the date selection is complete.
     * @param {TView | undefined} selectedView Indicates the view in which the selection has been made.
     */
    onChange: (value: TValue, selectionState?: PickerSelectionState, selectedView?: TView) => void;
    /**
     * Callback fired on view change.
     * @template TView
     * @param {TView} view The new view.
     */
    onViewChange?: (view: TView) => void;
    /**
     * The default visible view.
     * Used when the component view is not controlled.
     * Must be a valid option from `views` list.
     */
    openTo?: TView;
    /**
     * The visible view.
     * Used when the component view is controlled.
     * Must be a valid option from `views` list.
     */
    view?: TView;
    /**
     * Available views.
     */
    views: readonly TView[];
    /**
     * If `true`, the main element is focused during the first mount.
     * This main element is:
     * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
     * - the `input` element if there is a field rendered.
     */
    autoFocus?: boolean;
    /**
     * Controlled focused view.
     */
    focusedView?: TView | null;
    /**
     * Callback fired on focused view change.
     * @template TView
     * @param {TView} view The new view to focus or not.
     * @param {boolean} hasFocus `true` if the view should be focused.
     */
    onFocusedViewChange?: (view: TView, hasFocus: boolean) => void;
}
export interface ExportedUseViewsOptions<TView extends DateOrTimeViewWithMeridiem> extends MakeOptional<UseViewsOptions<any, TView>, 'onChange' | 'openTo' | 'views'> {
}
interface UseViewsResponse<TValue, TView extends DateOrTimeViewWithMeridiem> {
    view: TView;
    setView: (view: TView) => void;
    focusedView: TView | null;
    setFocusedView: (view: TView, hasFocus: boolean) => void;
    nextView: TView | null;
    previousView: TView | null;
    defaultView: TView;
    goToNextView: () => void;
    setValueAndGoToNextView: (value: TValue, currentViewSelectionState?: PickerSelectionState, selectedView?: TView) => void;
}
export declare function useViews<TValue, TView extends DateOrTimeViewWithMeridiem>({ onChange, onViewChange, openTo, view: inView, views, autoFocus, focusedView: inFocusedView, onFocusedViewChange, }: UseViewsOptions<TValue, TView>): UseViewsResponse<TValue, TView>;
export {};
