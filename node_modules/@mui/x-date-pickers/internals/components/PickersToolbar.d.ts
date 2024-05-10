import * as React from 'react';
import { BaseToolbarProps } from '../models/props/toolbar';
import { PickersToolbarClasses } from './pickersToolbarClasses';
import { DateOrTimeViewWithMeridiem } from '../models';
export interface PickersToolbarProps<TValue, TView extends DateOrTimeViewWithMeridiem> extends Pick<BaseToolbarProps<TValue, TView>, 'isLandscape' | 'hidden' | 'titleId'> {
    className?: string;
    landscapeDirection?: 'row' | 'column';
    toolbarTitle: React.ReactNode;
    classes?: Partial<PickersToolbarClasses>;
}
type PickersToolbarComponent = (<TValue, TView extends DateOrTimeViewWithMeridiem>(props: React.PropsWithChildren<PickersToolbarProps<TValue, TView>> & React.RefAttributes<HTMLDivElement>) => React.JSX.Element) & {
    propTypes?: any;
};
export declare const PickersToolbar: PickersToolbarComponent;
export {};
