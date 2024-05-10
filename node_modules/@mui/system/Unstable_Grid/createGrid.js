"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGrid;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _isMuiElement = _interopRequireDefault(require("@mui/utils/isMuiElement"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _styled = _interopRequireDefault(require("../styled"));
var _useThemeProps = _interopRequireDefault(require("../useThemeProps"));
var _useTheme = _interopRequireDefault(require("../useTheme"));
var _styleFunctionSx = require("../styleFunctionSx");
var _createTheme = _interopRequireDefault(require("../createTheme"));
var _gridGenerator = require("./gridGenerator");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "children", "columns", "container", "component", "direction", "wrap", "spacing", "rowSpacing", "columnSpacing", "disableEqualOverflow", "unstable_level"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const defaultTheme = (0, _createTheme.default)();

// widening Theme to any so that the consumer can own the theme structure.
const defaultCreateStyledComponent = (0, _styled.default)('div', {
  name: 'MuiGrid',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
});
function useThemePropsDefault(props) {
  return (0, _useThemeProps.default)({
    props,
    name: 'MuiGrid',
    defaultTheme
  });
}
function createGrid(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    componentName = 'MuiGrid'
  } = options;
  const GridOverflowContext = /*#__PURE__*/React.createContext(undefined);
  if (process.env.NODE_ENV !== 'production') {
    GridOverflowContext.displayName = 'GridOverflowContext';
  }
  const useUtilityClasses = (ownerState, theme) => {
    const {
      container,
      direction,
      spacing,
      wrap,
      gridSize
    } = ownerState;
    const slots = {
      root: ['root', container && 'container', wrap !== 'wrap' && `wrap-xs-${String(wrap)}`, ...(0, _gridGenerator.generateDirectionClasses)(direction), ...(0, _gridGenerator.generateSizeClassNames)(gridSize), ...(container ? (0, _gridGenerator.generateSpacingClassNames)(spacing, theme.breakpoints.keys[0]) : [])]
    };
    return (0, _composeClasses.default)(slots, slot => (0, _generateUtilityClass.default)(componentName, slot), {});
  };
  const GridRoot = createStyledComponent(_gridGenerator.generateGridColumnsStyles, _gridGenerator.generateGridColumnSpacingStyles, _gridGenerator.generateGridRowSpacingStyles, _gridGenerator.generateGridSizeStyles, _gridGenerator.generateGridDirectionStyles, _gridGenerator.generateGridStyles, _gridGenerator.generateGridOffsetStyles);
  const Grid = /*#__PURE__*/React.forwardRef(function Grid(inProps, ref) {
    var _inProps$columns, _inProps$spacing, _ref, _inProps$rowSpacing, _ref2, _inProps$columnSpacin, _ref3, _disableEqualOverflow;
    const theme = (0, _useTheme.default)();
    const themeProps = useThemeProps(inProps);
    const props = (0, _styleFunctionSx.extendSxProp)(themeProps); // `color` type conflicts with html color attribute.
    const overflow = React.useContext(GridOverflowContext);
    const {
        className,
        children,
        columns: columnsProp = 12,
        container = false,
        component = 'div',
        direction = 'row',
        wrap = 'wrap',
        spacing: spacingProp = 0,
        rowSpacing: rowSpacingProp = spacingProp,
        columnSpacing: columnSpacingProp = spacingProp,
        disableEqualOverflow: themeDisableEqualOverflow,
        unstable_level: level = 0
      } = props,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
    // Because `disableEqualOverflow` can be set from the theme's defaultProps, the **nested** grid should look at the instance props instead.
    let disableEqualOverflow = themeDisableEqualOverflow;
    if (level && themeDisableEqualOverflow !== undefined) {
      disableEqualOverflow = inProps.disableEqualOverflow;
    }
    // collect breakpoints related props because they can be customized from the theme.
    const gridSize = {};
    const gridOffset = {};
    const other = {};
    Object.entries(rest).forEach(([key, val]) => {
      if (theme.breakpoints.values[key] !== undefined) {
        gridSize[key] = val;
      } else if (theme.breakpoints.values[key.replace('Offset', '')] !== undefined) {
        gridOffset[key.replace('Offset', '')] = val;
      } else {
        other[key] = val;
      }
    });
    const columns = (_inProps$columns = inProps.columns) != null ? _inProps$columns : level ? undefined : columnsProp;
    const spacing = (_inProps$spacing = inProps.spacing) != null ? _inProps$spacing : level ? undefined : spacingProp;
    const rowSpacing = (_ref = (_inProps$rowSpacing = inProps.rowSpacing) != null ? _inProps$rowSpacing : inProps.spacing) != null ? _ref : level ? undefined : rowSpacingProp;
    const columnSpacing = (_ref2 = (_inProps$columnSpacin = inProps.columnSpacing) != null ? _inProps$columnSpacin : inProps.spacing) != null ? _ref2 : level ? undefined : columnSpacingProp;
    const ownerState = (0, _extends2.default)({}, props, {
      level,
      columns,
      container,
      direction,
      wrap,
      spacing,
      rowSpacing,
      columnSpacing,
      gridSize,
      gridOffset,
      disableEqualOverflow: (_ref3 = (_disableEqualOverflow = disableEqualOverflow) != null ? _disableEqualOverflow : overflow) != null ? _ref3 : false,
      // use context value if exists.
      parentDisableEqualOverflow: overflow // for nested grid
    });
    const classes = useUtilityClasses(ownerState, theme);
    let result = /*#__PURE__*/(0, _jsxRuntime.jsx)(GridRoot, (0, _extends2.default)({
      ref: ref,
      as: component,
      ownerState: ownerState,
      className: (0, _clsx.default)(classes.root, className)
    }, other, {
      children: React.Children.map(children, child => {
        if ( /*#__PURE__*/React.isValidElement(child) && (0, _isMuiElement.default)(child, ['Grid'])) {
          var _child$props$unstable;
          return /*#__PURE__*/React.cloneElement(child, {
            unstable_level: (_child$props$unstable = child.props.unstable_level) != null ? _child$props$unstable : level + 1
          });
        }
        return child;
      })
    }));
    if (disableEqualOverflow !== undefined && disableEqualOverflow !== (overflow != null ? overflow : false)) {
      // There are 2 possibilities that should wrap with the GridOverflowContext to communicate with the nested grids:
      // 1. It is the root grid with `disableEqualOverflow`.
      // 2. It is a nested grid with different `disableEqualOverflow` from the context.
      result = /*#__PURE__*/(0, _jsxRuntime.jsx)(GridOverflowContext.Provider, {
        value: disableEqualOverflow,
        children: result
      });
    }
    return result;
  });
  process.env.NODE_ENV !== "production" ? Grid.propTypes /* remove-proptypes */ = {
    children: _propTypes.default.node,
    className: _propTypes.default.string,
    columns: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number, _propTypes.default.object]),
    columnSpacing: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),
    component: _propTypes.default.elementType,
    container: _propTypes.default.bool,
    direction: _propTypes.default.oneOfType([_propTypes.default.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), _propTypes.default.object]),
    disableEqualOverflow: _propTypes.default.bool,
    lg: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.bool]),
    lgOffset: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number]),
    md: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.bool]),
    mdOffset: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number]),
    rowSpacing: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),
    sm: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.bool]),
    smOffset: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number]),
    spacing: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),
    sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
    wrap: _propTypes.default.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
    xl: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.bool]),
    xlOffset: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number]),
    xs: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.bool]),
    xsOffset: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number])
  } : void 0;

  // @ts-ignore internal logic for nested grid
  Grid.muiName = 'Grid';
  return Grid;
}