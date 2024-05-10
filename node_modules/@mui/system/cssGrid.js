"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowGap = exports.gridTemplateRows = exports.gridTemplateColumns = exports.gridTemplateAreas = exports.gridRow = exports.gridColumn = exports.gridAutoRows = exports.gridAutoFlow = exports.gridAutoColumns = exports.gridArea = exports.gap = exports.default = exports.columnGap = void 0;
var _style = _interopRequireDefault(require("./style"));
var _compose = _interopRequireDefault(require("./compose"));
var _spacing = require("./spacing");
var _breakpoints = require("./breakpoints");
var _responsivePropType = _interopRequireDefault(require("./responsivePropType"));
// false positive
// eslint-disable-next-line react/function-component-definition
const gap = props => {
  if (props.gap !== undefined && props.gap !== null) {
    const transformer = (0, _spacing.createUnaryUnit)(props.theme, 'spacing', 8, 'gap');
    const styleFromPropValue = propValue => ({
      gap: (0, _spacing.getValue)(transformer, propValue)
    });
    return (0, _breakpoints.handleBreakpoints)(props, props.gap, styleFromPropValue);
  }
  return null;
};
exports.gap = gap;
gap.propTypes = process.env.NODE_ENV !== 'production' ? {
  gap: _responsivePropType.default
} : {};
gap.filterProps = ['gap'];

// false positive
// eslint-disable-next-line react/function-component-definition
const columnGap = props => {
  if (props.columnGap !== undefined && props.columnGap !== null) {
    const transformer = (0, _spacing.createUnaryUnit)(props.theme, 'spacing', 8, 'columnGap');
    const styleFromPropValue = propValue => ({
      columnGap: (0, _spacing.getValue)(transformer, propValue)
    });
    return (0, _breakpoints.handleBreakpoints)(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
exports.columnGap = columnGap;
columnGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  columnGap: _responsivePropType.default
} : {};
columnGap.filterProps = ['columnGap'];

// false positive
// eslint-disable-next-line react/function-component-definition
const rowGap = props => {
  if (props.rowGap !== undefined && props.rowGap !== null) {
    const transformer = (0, _spacing.createUnaryUnit)(props.theme, 'spacing', 8, 'rowGap');
    const styleFromPropValue = propValue => ({
      rowGap: (0, _spacing.getValue)(transformer, propValue)
    });
    return (0, _breakpoints.handleBreakpoints)(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
exports.rowGap = rowGap;
rowGap.propTypes = process.env.NODE_ENV !== 'production' ? {
  rowGap: _responsivePropType.default
} : {};
rowGap.filterProps = ['rowGap'];
const gridColumn = exports.gridColumn = (0, _style.default)({
  prop: 'gridColumn'
});
const gridRow = exports.gridRow = (0, _style.default)({
  prop: 'gridRow'
});
const gridAutoFlow = exports.gridAutoFlow = (0, _style.default)({
  prop: 'gridAutoFlow'
});
const gridAutoColumns = exports.gridAutoColumns = (0, _style.default)({
  prop: 'gridAutoColumns'
});
const gridAutoRows = exports.gridAutoRows = (0, _style.default)({
  prop: 'gridAutoRows'
});
const gridTemplateColumns = exports.gridTemplateColumns = (0, _style.default)({
  prop: 'gridTemplateColumns'
});
const gridTemplateRows = exports.gridTemplateRows = (0, _style.default)({
  prop: 'gridTemplateRows'
});
const gridTemplateAreas = exports.gridTemplateAreas = (0, _style.default)({
  prop: 'gridTemplateAreas'
});
const gridArea = exports.gridArea = (0, _style.default)({
  prop: 'gridArea'
});
const grid = (0, _compose.default)(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
var _default = exports.default = grid;