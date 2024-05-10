import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import useEventCallback from '@mui/utils/useEventCallback';
import { useGridLogger } from '../../utils/useGridLogger';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { gridDensitySelector } from './densitySelector';
import { useGridRegisterPipeProcessor } from '../../core/pipeProcessing';
export const densityStateInitializer = (state, props) => _extends({}, state, {
  density: props.initialState?.density ?? props.density ?? 'standard'
});
export const useGridDensity = (apiRef, props) => {
  const logger = useGridLogger(apiRef, 'useDensity');
  apiRef.current.registerControlState({
    stateId: 'density',
    propModel: props.density,
    propOnChange: props.onDensityChange,
    stateSelector: gridDensitySelector,
    changeEvent: 'densityChange'
  });
  const setDensity = useEventCallback(newDensity => {
    const currentDensity = gridDensitySelector(apiRef.current.state);
    if (currentDensity === newDensity) {
      return;
    }
    logger.debug(`Set grid density to ${newDensity}`);
    apiRef.current.setState(state => _extends({}, state, {
      density: newDensity
    }));
  });
  const densityApi = {
    setDensity
  };
  useGridApiMethod(apiRef, densityApi, 'public');
  const stateExportPreProcessing = React.useCallback((prevState, context) => {
    const exportedDensity = gridDensitySelector(apiRef.current.state);
    const shouldExportRowCount =
    // Always export if the `exportOnlyDirtyModels` property is not activated
    !context.exportOnlyDirtyModels ||
    // Always export if the `density` is controlled
    props.density != null ||
    // Always export if the `density` has been initialized
    props.initialState?.density != null;
    if (!shouldExportRowCount) {
      return prevState;
    }
    return _extends({}, prevState, {
      density: exportedDensity
    });
  }, [apiRef, props.density, props.initialState?.density]);
  const stateRestorePreProcessing = React.useCallback((params, context) => {
    const restoredDensity = context.stateToRestore?.density ? context.stateToRestore.density : gridDensitySelector(apiRef.current.state);
    apiRef.current.setState(state => _extends({}, state, {
      density: restoredDensity
    }));
    return params;
  }, [apiRef]);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);
  React.useEffect(() => {
    if (props.density) {
      apiRef.current.setDensity(props.density);
    }
  }, [apiRef, props.density]);
};