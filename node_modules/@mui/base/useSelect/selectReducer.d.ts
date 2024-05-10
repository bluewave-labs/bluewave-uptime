import { ListAction, ListActionContext } from '../useList';
import { ActionWithContext } from '../utils/useControllableReducer.types';
import { SelectAction, SelectInternalState } from './useSelect.types';
export declare function selectReducer<OptionValue>(state: SelectInternalState<OptionValue>, action: ActionWithContext<ListAction<OptionValue> | SelectAction<OptionValue>, ListActionContext<OptionValue>>): SelectInternalState<OptionValue>;
