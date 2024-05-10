import { UseListParameters, ListState, UseListReturnValue } from './useList.types';
import { ControllableReducerAction } from '../utils/useControllableReducer.types';
/**
 * The useList is a lower-level utility that is used to build list-like components.
 * It's used to manage the state of the list and its items.
 *
 * Supports highlighting a single item and selecting an arbitrary number of items.
 *
 * The state of the list is managed by a controllable reducer - that is a reducer that can have its state
 * controlled from outside.
 *
 * By default, the state consists of `selectedValues` and `highlightedValue` but can be extended by the caller of the hook.
 * Also the actions that can be dispatched and the reducer function can be defined externally.
 *
 * @template ItemValue The type of the item values.
 * @template State The type of the list state. This should be a subtype of `ListState<ItemValue>`.
 * @template CustomAction The type of the actions that can be dispatched (besides the standard ListAction).
 * @template CustomActionContext The shape of additional properties that will be added to actions when dispatched.
 *
 * @ignore - internal hook.
 */
declare function useList<ItemValue, State extends ListState<ItemValue> = ListState<ItemValue>, CustomAction extends ControllableReducerAction = never, CustomActionContext = {}>(params: UseListParameters<ItemValue, State, CustomAction, CustomActionContext>): UseListReturnValue<ItemValue, State, CustomAction>;
export { useList };
