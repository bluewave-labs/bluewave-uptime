'use client';

import * as React from 'react';
var globalId = 0;
function useGlobalId(idOverride) {
  var _React$useState = React.useState(idOverride),
    defaultId = _React$useState[0],
    setDefaultId = _React$useState[1];
  var id = idOverride || defaultId;
  React.useEffect(function () {
    if (defaultId == null) {
      // Fallback to this default id when possible.
      // Use the incrementing value for client-side rendering only.
      // We can't use it server-side.
      // If you want to use random values please consider the Birthday Problem: https://en.wikipedia.org/wiki/Birthday_problem
      globalId += 1;
      setDefaultId("mui-".concat(globalId));
    }
  }, [defaultId]);
  return id;
}

// downstream bundlers may remove unnecessary concatenation, but won't remove toString call -- Workaround for https://github.com/webpack/webpack/issues/14814
var maybeReactUseId = React['useId'.toString()];
/**
 *
 * @example <div id={useId()} />
 * @param idOverride
 * @returns {string}
 */
export default function useId(idOverride) {
  if (maybeReactUseId !== undefined) {
    var reactId = maybeReactUseId();
    return idOverride != null ? idOverride : reactId;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks -- `React.useId` is invariant at runtime.
  return useGlobalId(idOverride);
}