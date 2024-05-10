"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemDefaultTheme = exports.default = void 0;
var _createTheme = _interopRequireDefault(require("./createTheme"));
var _useThemeWithoutDefault = _interopRequireDefault(require("./useThemeWithoutDefault"));
const systemDefaultTheme = exports.systemDefaultTheme = (0, _createTheme.default)();
function useTheme(defaultTheme = systemDefaultTheme) {
  return (0, _useThemeWithoutDefault.default)(defaultTheme);
}
var _default = exports.default = useTheme;