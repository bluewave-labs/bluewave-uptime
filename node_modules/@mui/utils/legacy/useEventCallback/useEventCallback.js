'use client';

import * as React from 'react';
import useEnhancedEffect from '../useEnhancedEffect';

/**
 * Inspired by https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * See RFC in https://github.com/reactjs/rfcs/pull/220
 */

function useEventCallback(fn) {
  var ref = React.useRef(fn);
  useEnhancedEffect(function () {
    ref.current = fn;
  });
  return React.useRef(function () {
    return (
      // @ts-expect-error hide `this`
      (0, ref.current).apply(void 0, arguments)
    );
  }).current;
}
export default useEventCallback;