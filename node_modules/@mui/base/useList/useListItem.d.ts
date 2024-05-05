import { UseListItemParameters, UseListItemReturnValue } from './useListItem.types';
/**
 * Contains the logic for an item of a list-like component (for example Select, Menu, etc.).
 * It handles the item's mouse events and tab index.
 *
 * @template ItemValue The type of the item's value. This should be consistent with the type of useList's `items` parameter.
 * @ignore - internal hook.
 */
export declare function useListItem<ItemValue>(parameters: UseListItemParameters<ItemValue>): UseListItemReturnValue;
