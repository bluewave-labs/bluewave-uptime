import * as React from 'react';
import { ListAction } from './listActions.types';
import { ListItemState } from './useList.types';
export interface ListContextValue<ItemValue> {
    dispatch: (action: ListAction<ItemValue>) => void;
    getItemState: (item: ItemValue) => ListItemState;
}
export declare const ListContext: React.Context<ListContextValue<any> | null>;
