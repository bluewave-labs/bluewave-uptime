"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _prepareCssVars = _interopRequireDefault(require("./prepareCssVars"));
const _excluded = ["cssVarPrefix", "shouldSkipGeneratingVar"];
function createCssVarsTheme(theme) {
  const {
      cssVarPrefix,
      shouldSkipGeneratingVar
    } = theme,
    otherTheme = (0, _objectWithoutPropertiesLoose2.default)(theme, _excluded);
  return (0, _extends2.default)({}, theme, (0, _prepareCssVars.default)(otherTheme, {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar
  }));
}
var _default = exports.default = createCssVarsTheme;