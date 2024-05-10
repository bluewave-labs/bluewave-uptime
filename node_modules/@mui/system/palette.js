"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.color = exports.bgcolor = exports.backgroundColor = void 0;
exports.paletteTransform = paletteTransform;
var _style = _interopRequireDefault(require("./style"));
var _compose = _interopRequireDefault(require("./compose"));
function paletteTransform(value, userValue) {
  if (userValue === 'grey') {
    return userValue;
  }
  return value;
}
const color = exports.color = (0, _style.default)({
  prop: 'color',
  themeKey: 'palette',
  transform: paletteTransform
});
const bgcolor = exports.bgcolor = (0, _style.default)({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform
});
const backgroundColor = exports.backgroundColor = (0, _style.default)({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform
});
const palette = (0, _compose.default)(color, bgcolor, backgroundColor);
var _default = exports.default = palette;