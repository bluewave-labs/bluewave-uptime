import { DateOrTimeView, MuiPickersAdapter, PickerValidDate } from '../../models';
import { DateOrTimeViewWithMeridiem } from '../models';
import { DesktopOnlyTimePickerProps } from '../models/props/clock';
import { DefaultizedProps } from '../models/helpers';
export declare const resolveDateTimeFormat: <TDate extends PickerValidDate>(utils: MuiPickersAdapter<TDate>, { views, format, ...other }: {
    format?: string;
    views: readonly DateOrTimeView[];
    ampm: boolean;
}) => string;
interface DefaultizedTimeViewsProps<TDate extends PickerValidDate, TView = DateOrTimeView> extends DefaultizedProps<DesktopOnlyTimePickerProps<TDate>, 'ampm'> {
    views: readonly TView[];
}
interface DefaultizedTimeViewsResponse<TDate extends PickerValidDate, TView = DateOrTimeViewWithMeridiem> extends Required<Pick<DefaultizedTimeViewsProps<TDate, TView>, 'thresholdToRenderTimeInASingleColumn' | 'timeSteps' | 'views'>> {
    shouldRenderTimeInASingleColumn: boolean;
}
export declare function resolveTimeViewsResponse<TDate extends PickerValidDate, InTView extends DateOrTimeView = DateOrTimeView, OutTView extends DateOrTimeViewWithMeridiem = DateOrTimeViewWithMeridiem>({ thresholdToRenderTimeInASingleColumn: inThreshold, ampm, timeSteps: inTimeSteps, views, }: DefaultizedTimeViewsProps<TDate, InTView>): DefaultizedTimeViewsResponse<TDate, OutTView>;
export {};
