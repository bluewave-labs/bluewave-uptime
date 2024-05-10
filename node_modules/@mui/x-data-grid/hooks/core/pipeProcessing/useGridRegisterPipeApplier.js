import * as React from 'react';
import { useFirstRender } from '../../utils/useFirstRender';
export const useGridRegisterPipeApplier = (apiRef, group, callback) => {
  const cleanup = React.useRef();
  const id = React.useRef(`mui-${Math.round(Math.random() * 1e9)}`);
  const registerPreProcessor = React.useCallback(() => {
    cleanup.current = apiRef.current.registerPipeApplier(group, id.current, callback);
  }, [apiRef, callback, group]);
  useFirstRender(() => {
    registerPreProcessor();
  });
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      registerPreProcessor();
    }
    return () => {
      if (cleanup.current) {
        cleanup.current();
        cleanup.current = null;
      }
    };
  }, [registerPreProcessor]);
};