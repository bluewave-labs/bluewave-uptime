import { ListState, ListAction, ListActionContext } from '../useList';
import { ActionWithContext } from '../utils/useControllableReducer.types';
import { ValueChangeAction } from './useTabsList.types';
export type TabsListActionContext = ListActionContext<string | number> & {
    selectionFollowsFocus: boolean;
};
export declare function tabsListReducer(state: ListState<string | number>, action: ActionWithContext<ListAction<string | number> | ValueChangeAction, TabsListActionContext>): ListState<string | number>;
