import { GridStateCommunity } from '../gridStateCommunity';
import { GridControlledStateEventLookup, GridControlledStateReasonLookup } from '../events';
import { GridControlStateItem } from '../controlStateItem';
export interface GridStateApi<State extends GridStateCommunity> {
    /**
     * Property that contains the whole state of the grid.
     */
    state: State;
    /**
     * Forces the grid to rerender. It's often used after a state update.
     */
    forceUpdate: () => void;
    /**
     * Sets the whole state of the grid.
     * @param {GridState | (oldState: GridState) => GridState} state The new state or the callback creating the new state.
     * @param {string} reason The reason for this change to happen.
     * @returns {boolean} Has the state been updated.
     * @ignore - do not document.
     */
    setState: <S extends State, K extends keyof GridControlledStateReasonLookup>(state: S | ((previousState: S) => S), reason?: GridControlledStateReasonLookup[K]) => boolean;
}
export interface GridStatePrivateApi<State extends GridStateCommunity> {
    /**
     * Updates a single sub-state.
     * Publishes the `xxxChange` event and calls the `onXXXChange` prop.
     * @param {K} key Which key of the state to update.
     * @param {(oldState: GridState) => GridState} state The new state of the sub-state to update.
     * @param {GridControlledStateReasonLookup[K]} reason The reason to pass to the callback prop and event.
     * @returns {boolean} `true` if the state has been successfully updated.
     */
    updateControlState: <K extends keyof GridControlledStateReasonLookup>(key: K, state: (oldState: State[K]) => State[K], reason?: GridControlledStateReasonLookup[K]) => boolean;
    /**
     * Updates a control state that binds the model, the onChange prop, and the grid state together.
     * @param {GridControlStateItem>} controlState The [[GridControlStateItem]] to be registered.
     */
    registerControlState: <E extends keyof GridControlledStateEventLookup>(controlState: GridControlStateItem<State, E>) => void;
}
