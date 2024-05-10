/**
 * @mui/styled-engine v5.15.14
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
'use client';

/* eslint-disable no-underscore-dangle */
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GlobalStyles", {
  enumerable: true,
  get: function () {
    return _GlobalStyles.default;
  }
});
Object.defineProperty(exports, "StyledEngineProvider", {
  enumerable: true,
  get: function () {
    return _StyledEngineProvider.default;
  }
});
Object.defineProperty(exports, "ThemeContext", {
  enumerable: true,
  get: function () {
    return _react.ThemeContext;
  }
});
Object.defineProperty(exports, "css", {
  enumerable: true,
  get: function () {
    return _react.css;
  }
});
exports.default = styled;
exports.internal_processStyles = void 0;
Object.defineProperty(exports, "keyframes", {
  enumerable: true,
  get: function () {
    return _react.keyframes;
  }
});
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _react = require("@emotion/react");
var _StyledEngineProvider = _interopRequireDefault(require("./StyledEngineProvider"));
var _GlobalStyles = _interopRequireDefault(require("./GlobalStyles"));
function styled(tag, options) {
  const stylesFactory = (0, _styled.default)(tag, options);
  if (process.env.NODE_ENV !== 'production') {
    return (...styles) => {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';
      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join('\n'));
      } else if (styles.some(style => style === undefined)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles);
    };
  }
  return stylesFactory;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const internal_processStyles = (tag, processor) => {
  // Emotion attaches all the styles as `__emotion_styles`.
  // Ref: https://github.com/emotion-js/emotion/blob/16d971d0da229596d6bcc39d282ba9753c9ee7cf/packages/styled/src/base.js#L186
  if (Array.isArray(tag.__emotion_styles)) {
    tag.__emotion_styles = processor(tag.__emotion_styles);
  }
};
exports.internal_processStyles = internal_processStyles;