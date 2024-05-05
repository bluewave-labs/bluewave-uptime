import * as ReactJSXRuntime from 'react/jsx-runtime';
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

var Fragment = ReactJSXRuntime.Fragment;
function jsx(type, props, key) {
  if (!hasOwn.call(props, 'css')) {
    return ReactJSXRuntime.jsx(type, props, key);
  }

  return ReactJSXRuntime.jsx(Emotion, createEmotionProps(type, props), key);
}
function jsxs(type, props, key) {
  if (!hasOwn.call(props, 'css')) {
    return ReactJSXRuntime.jsxs(type, props, key);
  }

  return ReactJSXRuntime.jsxs(Emotion, createEmotionProps(type, props), key);
}

export { Fragment, jsx, jsxs };
