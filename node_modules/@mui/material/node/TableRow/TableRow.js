"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _colorManipulator = require("@mui/system/colorManipulator");
var _Tablelvl2Context = _interopRequireDefault(require("../Table/Tablelvl2Context"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _styled = _interopRequireDefault(require("../styles/styled"));
var _tableRowClasses = _interopRequireWildcard(require("./tableRowClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "component", "hover", "selected"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    selected,
    hover,
    head,
    footer
  } = ownerState;
  const slots = {
    root: ['root', selected && 'selected', hover && 'hover', head && 'head', footer && 'footer']
  };
  return (0, _composeClasses.default)(slots, _tableRowClasses.getTableRowUtilityClass, classes);
};
const TableRowRoot = (0, _styled.default)('tr', {
  name: 'MuiTableRow',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.head && styles.head, ownerState.footer && styles.footer];
  }
})(({
  theme
}) => ({
  color: 'inherit',
  display: 'table-row',
  verticalAlign: 'middle',
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  [`&.${_tableRowClasses.default.hover}:hover`]: {
    backgroundColor: (theme.vars || theme).palette.action.hover
  },
  [`&.${_tableRowClasses.default.selected}`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : (0, _colorManipulator.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:hover': {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : (0, _colorManipulator.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity)
    }
  }
}));
const defaultComponent = 'tr';
/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */
const TableRow = /*#__PURE__*/React.forwardRef(function TableRow(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTableRow'
  });
  const {
      className,
      component = defaultComponent,
      hover = false,
      selected = false
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const tablelvl2 = React.useContext(_Tablelvl2Context.default);
  const ownerState = (0, _extends2.default)({}, props, {
    component,
    hover,
    selected,
    head: tablelvl2 && tablelvl2.variant === 'head',
    footer: tablelvl2 && tablelvl2.variant === 'footer'
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TableRowRoot, (0, _extends2.default)({
    as: component,
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    role: component === defaultComponent ? null : 'row',
    ownerState: ownerState
  }, other));
});
process.env.NODE_ENV !== "production" ? TableRow.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Should be valid `<tr>` children such as `TableCell`.
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * If `true`, the table row will shade on hover.
   * @default false
   */
  hover: _propTypes.default.bool,
  /**
   * If `true`, the table row will have the selected shading.
   * @default false
   */
  selected: _propTypes.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;
var _default = exports.default = TableRow;