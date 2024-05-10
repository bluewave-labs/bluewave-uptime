import { ListState, ListReducerAction, ListActionContext, SelectionMode } from './useList.types';
/**
 * Gets the next item to highlight based on the current highlighted item and the search direction.
 *
 * @param previouslyHighlightedValue The item from which to start the search for the next candidate.
 * @param offset The offset from the previously highlighted item to search for the next candidate or a special named value ('reset', 'start', 'end').
 * @param context The list action context.
 *
 * @returns The next item to highlight or null if no item is valid.
 */
export declare function moveHighlight<ItemValue>(previouslyHighlightedValue: ItemValue | null, offset: number | 'reset' | 'start' | 'end', context: ListActionContext<ItemValue>): NonNullable<ItemValue> | (ItemValue & undefined) | null;
/**
 * Toggles the selection of an item.
 *
 * @param item Item to toggle.
 * @param selectedValues Already selected items.
 * @param selectionMode The number of items that can be simultanously selected.
 * @param itemComparer A custom item comparer function.
 *
 * @returns The new array of selected items.
 */
export declare function toggleSelection<ItemValue>(item: ItemValue, selectedValues: ItemValue[], selectionMode: SelectionMode, itemComparer: (item1: ItemValue, item2: ItemValue) => boolean): ItemValue[];
/**
 * Handles item selection in a list.
 *
 * @param item - The item to be selected.
 * @param state - The current state of the list.
 * @param context - The context of the list action.
 * @returns The new state of the list after the item has been selected, or the original state if the item is disabled.
 */
export declare function handleItemSelection<ItemValue, State extends ListState<ItemValue>>(item: ItemValue, state: State, context: ListActionContext<ItemValue>): State;
export declare function listReducer<ItemValue, State extends ListState<ItemValue>>(state: State, action: ListReducerAction<ItemValue> & {
    context: ListActionContext<ItemValue>;
}): State;
