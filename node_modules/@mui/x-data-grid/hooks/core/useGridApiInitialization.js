import * as React from 'react';
import { Store } from '../../utils/Store';
import { useGridApiMethod } from '../utils/useGridApiMethod';
import { GridSignature } from '../utils/useGridApiEventHandler';
import { EventManager } from '../../utils/EventManager';
const SYMBOL_API_PRIVATE = Symbol('mui.api_private');
const isSyntheticEvent = event => {
  return event.isPropagationStopped !== undefined;
};
export function unwrapPrivateAPI(publicApi) {
  return publicApi[SYMBOL_API_PRIVATE];
}
let globalId = 0;
function createPrivateAPI(publicApiRef) {
  const existingPrivateApi = publicApiRef.current?.[SYMBOL_API_PRIVATE];
  if (existingPrivateApi) {
    return existingPrivateApi;
  }
  const state = {};
  const privateApi = {
    state,
    store: Store.create(state),
    instanceId: {
      id: globalId
    }
  };
  globalId += 1;
  privateApi.getPublicApi = () => publicApiRef.current;
  privateApi.register = (visibility, methods) => {
    Object.keys(methods).forEach(methodName => {
      const method = methods[methodName];
      const currentPrivateMethod = privateApi[methodName];
      if (currentPrivateMethod?.spying === true) {
        currentPrivateMethod.target = method;
      } else {
        privateApi[methodName] = method;
      }
      if (visibility === 'public') {
        const publicApi = publicApiRef.current;
        const currentPublicMethod = publicApi[methodName];
        if (currentPublicMethod?.spying === true) {
          currentPublicMethod.target = method;
        } else {
          publicApi[methodName] = method;
        }
      }
    });
  };
  privateApi.register('private', {
    caches: {},
    eventManager: new EventManager()
  });
  return privateApi;
}
function createPublicAPI(privateApiRef) {
  const publicApi = {
    get state() {
      return privateApiRef.current.state;
    },
    get store() {
      return privateApiRef.current.store;
    },
    get instanceId() {
      return privateApiRef.current.instanceId;
    },
    [SYMBOL_API_PRIVATE]: privateApiRef.current
  };
  return publicApi;
}
export function useGridApiInitialization(inputApiRef, props) {
  const publicApiRef = React.useRef();
  const privateApiRef = React.useRef();
  if (!privateApiRef.current) {
    privateApiRef.current = createPrivateAPI(publicApiRef);
  }
  if (!publicApiRef.current) {
    publicApiRef.current = createPublicAPI(privateApiRef);
  }
  const publishEvent = React.useCallback((...args) => {
    const [name, params, event = {}] = args;
    event.defaultMuiPrevented = false;
    if (isSyntheticEvent(event) && event.isPropagationStopped()) {
      return;
    }
    const details = props.signature === GridSignature.DataGridPro ? {
      api: privateApiRef.current.getPublicApi()
    } : {};
    privateApiRef.current.eventManager.emit(name, params, event, details);
  }, [privateApiRef, props.signature]);
  const subscribeEvent = React.useCallback((event, handler, options) => {
    privateApiRef.current.eventManager.on(event, handler, options);
    const api = privateApiRef.current;
    return () => {
      api.eventManager.removeListener(event, handler);
    };
  }, [privateApiRef]);
  useGridApiMethod(privateApiRef, {
    subscribeEvent,
    publishEvent
  }, 'public');
  if (inputApiRef && !inputApiRef.current?.state) {
    inputApiRef.current = publicApiRef.current;
  }
  React.useImperativeHandle(inputApiRef, () => publicApiRef.current, [publicApiRef]);
  React.useEffect(() => {
    const api = privateApiRef.current;
    return () => {
      api.publishEvent('unmount');
    };
  }, [privateApiRef]);
  return privateApiRef;
}