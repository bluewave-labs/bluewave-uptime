import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiMethod } from '../utils';
import { isFunction } from '../../utils/utils';
export const useGridStateInitialization = apiRef => {
  const controlStateMapRef = React.useRef({});
  const [, rawForceUpdate] = React.useState();
  const registerControlState = React.useCallback(controlStateItem => {
    controlStateMapRef.current[controlStateItem.stateId] = controlStateItem;
  }, []);
  const setState = React.useCallback((state, reason) => {
    let newState;
    if (isFunction(state)) {
      newState = state(apiRef.current.state);
    } else {
      newState = state;
    }
    if (apiRef.current.state === newState) {
      return false;
    }
    let ignoreSetState = false;

    // Apply the control state constraints
    const updatedControlStateIds = [];
    Object.keys(controlStateMapRef.current).forEach(stateId => {
      const controlState = controlStateMapRef.current[stateId];
      const oldSubState = controlState.stateSelector(apiRef.current.state, apiRef.current.instanceId);
      const newSubState = controlState.stateSelector(newState, apiRef.current.instanceId);
      if (newSubState === oldSubState) {
        return;
      }
      updatedControlStateIds.push({
        stateId: controlState.stateId,
        hasPropChanged: newSubState !== controlState.propModel
      });

      // The state is controlled, the prop should always win
      if (controlState.propModel !== undefined && newSubState !== controlState.propModel) {
        ignoreSetState = true;
      }
    });
    if (updatedControlStateIds.length > 1) {
      // Each hook modify its own state, and it should not leak
      // Events are here to forward to other hooks and apply changes.
      // You are trying to update several states in a no isolated way.
      throw new Error(`You're not allowed to update several sub-state in one transaction. You already updated ${updatedControlStateIds[0].stateId}, therefore, you're not allowed to update ${updatedControlStateIds.map(el => el.stateId).join(', ')} in the same transaction.`);
    }
    if (!ignoreSetState) {
      // We always assign it as we mutate rows for perf reason.
      apiRef.current.state = newState;
      if (apiRef.current.publishEvent) {
        apiRef.current.publishEvent('stateChange', newState);
      }
      apiRef.current.store.update(newState);
    }
    if (updatedControlStateIds.length === 1) {
      const {
        stateId,
        hasPropChanged
      } = updatedControlStateIds[0];
      const controlState = controlStateMapRef.current[stateId];
      const model = controlState.stateSelector(newState, apiRef.current.instanceId);
      if (controlState.propOnChange && hasPropChanged) {
        controlState.propOnChange(model, {
          reason,
          api: apiRef.current
        });
      }
      if (!ignoreSetState) {
        apiRef.current.publishEvent(controlState.changeEvent, model, {
          reason
        });
      }
    }
    return !ignoreSetState;
  }, [apiRef]);
  const updateControlState = React.useCallback((key, state, reason) => {
    return apiRef.current.setState(previousState => {
      return _extends({}, previousState, {
        [key]: state(previousState[key])
      });
    }, reason);
  }, [apiRef]);
  const forceUpdate = React.useCallback(() => rawForceUpdate(() => apiRef.current.state), [apiRef]);
  const publicStateApi = {
    setState,
    forceUpdate
  };
  const privateStateApi = {
    updateControlState,
    registerControlState
  };
  useGridApiMethod(apiRef, publicStateApi, 'public');
  useGridApiMethod(apiRef, privateStateApi, 'private');
};