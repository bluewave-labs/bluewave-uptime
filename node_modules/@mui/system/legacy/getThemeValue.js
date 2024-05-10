import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import borders from './borders';
import display from './display';
import flexbox from './flexbox';
import grid from './cssGrid';
import positions from './positions';
import palette from './palette';
import shadows from './shadows';
import sizing from './sizing';
import spacing from './spacing';
import typography from './typography';
var filterPropsMapping = {
  borders: borders.filterProps,
  display: display.filterProps,
  flexbox: flexbox.filterProps,
  grid: grid.filterProps,
  positions: positions.filterProps,
  palette: palette.filterProps,
  shadows: shadows.filterProps,
  sizing: sizing.filterProps,
  spacing: spacing.filterProps,
  typography: typography.filterProps
};
export var styleFunctionMapping = {
  borders: borders,
  display: display,
  flexbox: flexbox,
  grid: grid,
  positions: positions,
  palette: palette,
  shadows: shadows,
  sizing: sizing,
  spacing: spacing,
  typography: typography
};
export var propToStyleFunction = Object.keys(filterPropsMapping).reduce(function (acc, styleFnName) {
  filterPropsMapping[styleFnName].forEach(function (propName) {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});
function getThemeValue(prop, value, theme) {
  var inputProps = _defineProperty(_defineProperty({}, prop, value), "theme", theme);
  var styleFunction = propToStyleFunction[prop];
  return styleFunction ? styleFunction(inputProps) : _defineProperty({}, prop, value);
}
export default getThemeValue;