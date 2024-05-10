import { GridCallbackDetails } from './api/gridCallbackDetails';
import type { GridEventLookup, GridControlledStateEventLookup } from './events';
import type { OutputSelector } from '../utils/createSelector';
import { GridStateCommunity } from './gridStateCommunity';
export interface GridControlStateItem<State extends GridStateCommunity, E extends keyof GridControlledStateEventLookup> {
    stateId: string;
    propModel?: GridEventLookup[E]['params'];
    stateSelector: OutputSelector<State, GridControlledStateEventLookup[E]['params']> | ((state: State) => GridControlledStateEventLookup[E]['params']);
    propOnChange?: (model: GridControlledStateEventLookup[E]['params'], details: GridCallbackDetails) => void;
    changeEvent: E;
}
