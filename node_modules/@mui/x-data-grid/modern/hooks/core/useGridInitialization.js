import { useGridRefs } from './useGridRefs';
import { useGridTheme } from './useGridTheme';
import { useGridLoggerFactory } from './useGridLoggerFactory';
import { useGridApiInitialization } from './useGridApiInitialization';
import { useGridLocaleText } from './useGridLocaleText';
import { useGridPipeProcessing } from './pipeProcessing';
import { useGridStrategyProcessing } from './strategyProcessing';
import { useGridStateInitialization } from './useGridStateInitialization';

/**
 * Initialize the technical pieces of the DataGrid (logger, state, ...) that any DataGrid implementation needs
 */
export const useGridInitialization = (inputApiRef, props) => {
  const privateApiRef = useGridApiInitialization(inputApiRef, props);
  useGridRefs(privateApiRef);
  useGridTheme(privateApiRef);
  useGridLoggerFactory(privateApiRef, props);
  useGridStateInitialization(privateApiRef);
  useGridPipeProcessing(privateApiRef);
  useGridStrategyProcessing(privateApiRef);
  useGridLocaleText(privateApiRef, props);
  privateApiRef.current.register('private', {
    rootProps: props
  });
  return privateApiRef;
};