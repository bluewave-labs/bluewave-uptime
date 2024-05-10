import * as React from 'react';
import { isFunction } from '../../utils/utils';
import { useGridLogger } from './useGridLogger';
export const useGridNativeEventListener = (apiRef, ref, eventName, handler, options) => {
  const logger = useGridLogger(apiRef, 'useNativeEventListener');
  const [added, setAdded] = React.useState(false);
  const handlerRef = React.useRef(handler);
  const targetElement = isFunction(ref) ? ref() : ref?.current ?? null;
  const wrapHandler = React.useCallback(event => {
    return handlerRef.current && handlerRef.current(event);
  }, []);
  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);
  React.useEffect(() => {
    if (targetElement && eventName && !added) {
      logger.debug(`Binding native ${eventName} event`);
      targetElement.addEventListener(eventName, wrapHandler, options);
      setAdded(true);
      const unsubscribe = () => {
        logger.debug(`Clearing native ${eventName} event`);
        targetElement.removeEventListener(eventName, wrapHandler, options);
      };
      apiRef.current.subscribeEvent('unmount', unsubscribe);
    }
  }, [targetElement, wrapHandler, eventName, added, logger, options, apiRef]);
};