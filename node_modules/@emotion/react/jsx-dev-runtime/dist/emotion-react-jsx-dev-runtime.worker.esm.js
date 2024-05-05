import * as ReactJSXRuntimeDev from 'react/jsx-dev-runtime';
import { h as hasOwn, E as Emotion, c as createEmotionProps } from '../../dist/emotion-element-3ac3b1d0.worker.esm.js';
import 'react';
import '@emotion/cache';
import '@babel/runtime/helpers/extends';
import '@emotion/weak-memoize';
import '../../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js';
import 'hoist-non-react-statics';
import '@emotion/utils';
import '@emotion/serialize';
import '@emotion/use-insertion-effect-with-fallbacks';

var Fragment = ReactJSXRuntimeDev.Fragment;
function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (!hasOwn.call(props, 'css')) {
    return ReactJSXRuntimeDev.jsxDEV(type, props, key, isStaticChildren, source, self);
  }

  return ReactJSXRuntimeDev.jsxDEV(Emotion, createEmotionProps(type, props), key, isStaticChildren, source, self);
}

export { Fragment, jsxDEV };
