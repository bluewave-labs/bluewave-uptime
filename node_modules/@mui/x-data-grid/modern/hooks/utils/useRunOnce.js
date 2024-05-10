import * as React from 'react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
const noop = () => {};

/**
 * Runs an effect once, when `condition` is true.
 */
export const useRunOnce = (condition, effect) => {
  const didRun = React.useRef(false);
  useEnhancedEffect(() => {
    if (didRun.current || !condition) {
      return noop;
    }
    didRun.current = true;
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didRun.current || condition]);
};