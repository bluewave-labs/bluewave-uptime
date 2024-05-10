"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSelectorMemoized = exports.createSelector = void 0;
var _reselect = require("reselect");
var _warning = require("./warning");
const cache = new WeakMap();
const missingInstanceIdWarning = (0, _warning.buildWarning)(['MUI X: A selector was called without passing the instance ID, which may impact the performance of the grid.', 'To fix, call it with `apiRef`, for example `mySelector(apiRef)`, or pass the instance ID explicitly, for example `mySelector(state, apiRef.current.instanceId)`.']);
function checkIsAPIRef(value) {
  return 'current' in value && 'instanceId' in value.current;
}
const DEFAULT_INSTANCE_ID = {
  id: 'default'
};
const createSelector = (a, b, c, d, e, f, ...rest) => {
  if (rest.length > 0) {
    throw new Error('Unsupported number of selectors');
  }
  let selector;
  if (a && b && c && d && e && f) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
      const vb = b(state, instanceId);
      const vc = c(state, instanceId);
      const vd = d(state, instanceId);
      const ve = e(state, instanceId);
      return f(va, vb, vc, vd, ve);
    };
  } else if (a && b && c && d && e) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
      const vb = b(state, instanceId);
      const vc = c(state, instanceId);
      const vd = d(state, instanceId);
      return e(va, vb, vc, vd);
    };
  } else if (a && b && c && d) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
      const vb = b(state, instanceId);
      const vc = c(state, instanceId);
      return d(va, vb, vc);
    };
  } else if (a && b && c) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
      const vb = b(state, instanceId);
      return c(va, vb);
    };
  } else if (a && b) {
    selector = (stateOrApiRef, instanceIdParam) => {
      const isAPIRef = checkIsAPIRef(stateOrApiRef);
      const instanceId = instanceIdParam ?? (isAPIRef ? stateOrApiRef.current.instanceId : DEFAULT_INSTANCE_ID);
      const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
      const va = a(state, instanceId);
      return b(va);
    };
  } else {
    throw new Error('Missing arguments');
  }

  // We use this property to detect if the selector was created with createSelector
  // or it's only a simple function the receives the state and returns part of it.
  selector.acceptsApiRef = true;
  return selector;
};
exports.createSelector = createSelector;
const createSelectorMemoized = (...args) => {
  const selector = (stateOrApiRef, instanceId) => {
    const isAPIRef = checkIsAPIRef(stateOrApiRef);
    const cacheKey = isAPIRef ? stateOrApiRef.current.instanceId : instanceId ?? DEFAULT_INSTANCE_ID;
    const state = isAPIRef ? stateOrApiRef.current.state : stateOrApiRef;
    if (process.env.NODE_ENV !== 'production') {
      if (cacheKey.id === 'default') {
        missingInstanceIdWarning();
      }
    }
    const cacheArgsInit = cache.get(cacheKey);
    const cacheArgs = cacheArgsInit ?? new Map();
    const cacheFn = cacheArgs?.get(args);
    if (cacheArgs && cacheFn) {
      // We pass the cache key because the called selector might have as
      // dependency another selector created with this `createSelector`.
      return cacheFn(state, cacheKey);
    }
    const fn = (0, _reselect.createSelector)(...args);
    if (!cacheArgsInit) {
      cache.set(cacheKey, cacheArgs);
    }
    cacheArgs.set(args, fn);
    return fn(state, cacheKey);
  };

  // We use this property to detect if the selector was created with createSelector
  // or it's only a simple function the receives the state and returns part of it.
  selector.acceptsApiRef = true;
  return selector;
};
exports.createSelectorMemoized = createSelectorMemoized;