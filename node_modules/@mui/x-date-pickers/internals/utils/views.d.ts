import { DateOrTimeView } from '../../models';
import { DateOrTimeViewWithMeridiem } from '../models';
export declare const areViewsEqual: <TView extends DateOrTimeView>(views: ReadonlyArray<DateOrTimeView>, expectedViews: TView[]) => views is readonly TView[];
export declare const applyDefaultViewProps: <TView extends DateOrTimeViewWithMeridiem>({ openTo, defaultOpenTo, views, defaultViews, }: {
    openTo: TView | undefined;
    defaultOpenTo: TView;
    views: readonly TView[] | undefined;
    defaultViews: readonly TView[];
}) => {
    views: readonly TView[];
    openTo: TView;
};
