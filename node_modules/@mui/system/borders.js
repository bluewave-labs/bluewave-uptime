"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.borderTopColor = exports.borderTop = exports.borderRightColor = exports.borderRight = exports.borderRadius = exports.borderLeftColor = exports.borderLeft = exports.borderColor = exports.borderBottomColor = exports.borderBottom = exports.border = void 0;
exports.borderTransform = borderTransform;
exports.outlineColor = exports.outline = exports.default = void 0;
var _responsivePropType = _interopRequireDefault(require("./responsivePropType"));
var _style = _interopRequireDefault(require("./style"));
var _compose = _interopRequireDefault(require("./compose"));
var _spacing = require("./spacing");
var _breakpoints = require("./breakpoints");
function borderTransform(value) {
  if (typeof value !== 'number') {
    return value;
  }
  return `${value}px solid`;
}
function createBorderStyle(prop, transform) {
  return (0, _style.default)({
    prop,
    themeKey: 'borders',
    transform
  });
}
const border = exports.border = createBorderStyle('border', borderTransform);
const borderTop = exports.borderTop = createBorderStyle('borderTop', borderTransform);
const borderRight = exports.borderRight = createBorderStyle('borderRight', borderTransform);
const borderBottom = exports.borderBottom = createBorderStyle('borderBottom', borderTransform);
const borderLeft = exports.borderLeft = createBorderStyle('borderLeft', borderTransform);
const borderColor = exports.borderColor = createBorderStyle('borderColor');
const borderTopColor = exports.borderTopColor = createBorderStyle('borderTopColor');
const borderRightColor = exports.borderRightColor = createBorderStyle('borderRightColor');
const borderBottomColor = exports.borderBottomColor = createBorderStyle('borderBottomColor');
const borderLeftColor = exports.borderLeftColor = createBorderStyle('borderLeftColor');
const outline = exports.outline = createBorderStyle('outline', borderTransform);
const outlineColor = exports.outlineColor = createBorderStyle('outlineColor');

// false positive
// eslint-disable-next-line react/function-component-definition
const borderRadius = props => {
  if (props.borderRadius !== undefined && props.borderRadius !== null) {
    const transformer = (0, _spacing.createUnaryUnit)(props.theme, 'shape.borderRadius', 4, 'borderRadius');
    const styleFromPropValue = propValue => ({
      borderRadius: (0, _spacing.getValue)(transformer, propValue)
    });
    return (0, _breakpoints.handleBreakpoints)(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
exports.borderRadius = borderRadius;
borderRadius.propTypes = process.env.NODE_ENV !== 'production' ? {
  borderRadius: _responsivePropType.default
} : {};
borderRadius.filterProps = ['borderRadius'];
const borders = (0, _compose.default)(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);
var _default = exports.default = borders;