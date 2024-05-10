import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
export const EMPTY_RENDER_CONTEXT = {
  firstRowIndex: 0,
  lastRowIndex: 0,
  firstColumnIndex: 0,
  lastColumnIndex: 0
};
export const virtualizationStateInitializer = (state, props) => {
  const virtualization = {
    enabled: !props.disableVirtualization,
    enabledForColumns: true,
    renderContext: EMPTY_RENDER_CONTEXT
  };
  return _extends({}, state, {
    virtualization
  });
};
export function useGridVirtualization(apiRef, props) {
  /*
   * API METHODS
   */

  const setVirtualization = enabled => {
    apiRef.current.setState(state => _extends({}, state, {
      virtualization: _extends({}, state.virtualization, {
        enabled
      })
    }));
  };
  const setColumnVirtualization = enabled => {
    apiRef.current.setState(state => _extends({}, state, {
      virtualization: _extends({}, state.virtualization, {
        enabledForColumns: enabled
      })
    }));
  };
  const api = {
    unstable_setVirtualization: setVirtualization,
    unstable_setColumnVirtualization: setColumnVirtualization
  };
  useGridApiMethod(apiRef, api, 'public');

  /*
   * EFFECTS
   */

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    setVirtualization(!props.disableVirtualization);
  }, [props.disableVirtualization]);
  /* eslint-enable react-hooks/exhaustive-deps */
}