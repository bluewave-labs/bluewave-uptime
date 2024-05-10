"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sizeWidth = exports.sizeHeight = exports.minWidth = exports.minHeight = exports.maxWidth = exports.maxHeight = exports.height = exports.default = exports.boxSizing = void 0;
exports.sizingTransform = sizingTransform;
exports.width = void 0;
var _style = _interopRequireDefault(require("./style"));
var _compose = _interopRequireDefault(require("./compose"));
var _breakpoints = require("./breakpoints");
function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
const width = exports.width = (0, _style.default)({
  prop: 'width',
  transform: sizingTransform
});
const maxWidth = props => {
  if (props.maxWidth !== undefined && props.maxWidth !== null) {
    const styleFromPropValue = propValue => {
      var _props$theme, _props$theme2;
      const breakpoint = ((_props$theme = props.theme) == null || (_props$theme = _props$theme.breakpoints) == null || (_props$theme = _props$theme.values) == null ? void 0 : _props$theme[propValue]) || _breakpoints.values[propValue];
      if (!breakpoint) {
        return {
          maxWidth: sizingTransform(propValue)
        };
      }
      if (((_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.breakpoints) == null ? void 0 : _props$theme2.unit) !== 'px') {
        return {
          maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`
        };
      }
      return {
        maxWidth: breakpoint
      };
    };
    return (0, _breakpoints.handleBreakpoints)(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
exports.maxWidth = maxWidth;
maxWidth.filterProps = ['maxWidth'];
const minWidth = exports.minWidth = (0, _style.default)({
  prop: 'minWidth',
  transform: sizingTransform
});
const height = exports.height = (0, _style.default)({
  prop: 'height',
  transform: sizingTransform
});
const maxHeight = exports.maxHeight = (0, _style.default)({
  prop: 'maxHeight',
  transform: sizingTransform
});
const minHeight = exports.minHeight = (0, _style.default)({
  prop: 'minHeight',
  transform: sizingTransform
});
const sizeWidth = exports.sizeWidth = (0, _style.default)({
  prop: 'size',
  cssProperty: 'width',
  transform: sizingTransform
});
const sizeHeight = exports.sizeHeight = (0, _style.default)({
  prop: 'size',
  cssProperty: 'height',
  transform: sizingTransform
});
const boxSizing = exports.boxSizing = (0, _style.default)({
  prop: 'boxSizing'
});
const sizing = (0, _compose.default)(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var _default = exports.default = sizing;