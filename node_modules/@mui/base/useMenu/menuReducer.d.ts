/// <reference types="react" />
import { ListAction, ListActionContext } from '../useList';
import { ActionWithContext } from '../utils/useControllableReducer.types';
import { MenuInternalState } from './useMenu.types';
export type MenuActionContext = ListActionContext<string> & {
    listboxRef: React.RefObject<HTMLElement>;
};
export declare function menuReducer(state: MenuInternalState, action: ActionWithContext<ListAction<string>, MenuActionContext>): MenuInternalState | {
    open: boolean;
    highlightedValue: string | null;
    selectedValues: string[];
};
