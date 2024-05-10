'use client';

import * as React from 'react';
/**
 * @ignore - internal hook.
 */
export function useForcedRerendering() {
  var _React$useState = React.useState({}),
    setState = _React$useState[1];
  return React.useCallback(function () {
    setState({});
  }, []);
}