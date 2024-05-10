"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useThemeProps;
var _useThemeProps = _interopRequireDefault(require("@mui/system/useThemeProps"));
var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));
var _identifier = _interopRequireDefault(require("./identifier"));
function useThemeProps({
  props,
  name
}) {
  return (0, _useThemeProps.default)({
    props,
    name,
    defaultTheme: _defaultTheme.default,
    themeId: _identifier.default
  });
}