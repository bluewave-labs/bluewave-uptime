"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _styled = _interopRequireDefault(require("../styles/styled"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _listSubheaderClasses = require("./listSubheaderClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "color", "component", "disableGutters", "disableSticky", "inset"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    color,
    disableGutters,
    inset,
    disableSticky
  } = ownerState;
  const slots = {
    root: ['root', color !== 'default' && `color${(0, _capitalize.default)(color)}`, !disableGutters && 'gutters', inset && 'inset', !disableSticky && 'sticky']
  };
  return (0, _composeClasses.default)(slots, _listSubheaderClasses.getListSubheaderUtilityClass, classes);
};
const ListSubheaderRoot = (0, _styled.default)('li', {
  name: 'MuiListSubheader',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== 'default' && styles[`color${(0, _capitalize.default)(ownerState.color)}`], !ownerState.disableGutters && styles.gutters, ownerState.inset && styles.inset, !ownerState.disableSticky && styles.sticky];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  boxSizing: 'border-box',
  lineHeight: '48px',
  listStyle: 'none',
  color: (theme.vars || theme).palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14)
}, ownerState.color === 'primary' && {
  color: (theme.vars || theme).palette.primary.main
}, ownerState.color === 'inherit' && {
  color: 'inherit'
}, !ownerState.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, ownerState.inset && {
  paddingLeft: 72
}, !ownerState.disableSticky && {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: (theme.vars || theme).palette.background.paper
}));
const ListSubheader = /*#__PURE__*/React.forwardRef(function ListSubheader(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiListSubheader'
  });
  const {
      className,
      color = 'default',
      component = 'li',
      disableGutters = false,
      disableSticky = false,
      inset = false
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    component,
    disableGutters,
    disableSticky,
    inset
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ListSubheaderRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other));
});
ListSubheader.muiSkipListHighlight = true;
process.env.NODE_ENV !== "production" ? ListSubheader.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: _propTypes.default.oneOf(['default', 'inherit', 'primary']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters: _propTypes.default.bool,
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   * @default false
   */
  disableSticky: _propTypes.default.bool,
  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset: _propTypes.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;
var _default = exports.default = ListSubheader;