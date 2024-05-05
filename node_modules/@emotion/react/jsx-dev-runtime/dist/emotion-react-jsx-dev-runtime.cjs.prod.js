'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ReactJSXRuntimeDev = require('react/jsx-dev-runtime');
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

var ReactJSXRuntimeDev__namespace = /*#__PURE__*/_interopNamespace(ReactJSXRuntimeDev);

var Fragment = ReactJSXRuntimeDev__namespace.Fragment;
function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (!emotionElement.hasOwn.call(props, 'css')) {
    return ReactJSXRuntimeDev__namespace.jsxDEV(type, props, key, isStaticChildren, source, self);
  }

  return ReactJSXRuntimeDev__namespace.jsxDEV(emotionElement.Emotion, emotionElement.createEmotionProps(type, props), key, isStaticChildren, source, self);
}

exports.Fragment = Fragment;
exports.jsxDEV = jsxDEV;
