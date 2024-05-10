"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typographyVariant = exports.textTransform = exports.textAlign = exports.lineHeight = exports.letterSpacing = exports.fontWeight = exports.fontStyle = exports.fontSize = exports.fontFamily = exports.default = void 0;
var _style = _interopRequireDefault(require("./style"));
var _compose = _interopRequireDefault(require("./compose"));
const fontFamily = exports.fontFamily = (0, _style.default)({
  prop: 'fontFamily',
  themeKey: 'typography'
});
const fontSize = exports.fontSize = (0, _style.default)({
  prop: 'fontSize',
  themeKey: 'typography'
});
const fontStyle = exports.fontStyle = (0, _style.default)({
  prop: 'fontStyle',
  themeKey: 'typography'
});
const fontWeight = exports.fontWeight = (0, _style.default)({
  prop: 'fontWeight',
  themeKey: 'typography'
});
const letterSpacing = exports.letterSpacing = (0, _style.default)({
  prop: 'letterSpacing'
});
const textTransform = exports.textTransform = (0, _style.default)({
  prop: 'textTransform'
});
const lineHeight = exports.lineHeight = (0, _style.default)({
  prop: 'lineHeight'
});
const textAlign = exports.textAlign = (0, _style.default)({
  prop: 'textAlign'
});
const typographyVariant = exports.typographyVariant = (0, _style.default)({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography'
});
const typography = (0, _compose.default)(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textTransform);
var _default = exports.default = typography;