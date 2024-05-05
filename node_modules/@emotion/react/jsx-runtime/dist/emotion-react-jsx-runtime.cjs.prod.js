'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ReactJSXRuntime = require('react/jsx-runtime');
var emotionElement = require('../../dist/emotion-element-eec0d725.cjs.prod.js');
require('react');
require('@emotion/cache');
require('@babel/runtime/helpers/extends');
require('@emotion/weak-memoize');
require('../../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.prod.js');
require('hoist-non-react-statics');
require('@emotion/utils');
require('@emotion/serialize');
require('@emotion/use-insertion-effect-with-fallbacks');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var ReactJSXRuntime__namespace = /*#__PURE__*/_interopNamespace(ReactJSXRuntime);

var Fragment = ReactJSXRuntime__namespace.Fragment;
function jsx(type, props, key) {
  if (!emotionElement.hasOwn.call(props, 'css')) {
    return ReactJSXRuntime__namespace.jsx(type, props, key);
  }

  return ReactJSXRuntime__namespace.jsx(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
}
function jsxs(type, props, key) {
  if (!emotionElement.hasOwn.call(props, 'css')) {
    return ReactJSXRuntime__namespace.jsxs(type, props, key);
  }

  return ReactJSXRuntime__namespace.jsxs(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key);
}

exports.Fragment = Fragment;
exports.jsx = jsx;
exports.jsxs = jsxs;
