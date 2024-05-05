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
var _colorManipulator = require("@mui/system/colorManipulator");
var _styled = _interopRequireDefault(require("../styles/styled"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _dividerClasses = require("./dividerClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["absolute", "children", "className", "component", "flexItem", "light", "orientation", "role", "textAlign", "variant"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    absolute,
    children,
    classes,
    flexItem,
    light,
    orientation,
    textAlign,
    variant
  } = ownerState;
  const slots = {
    root: ['root', absolute && 'absolute', variant, light && 'light', orientation === 'vertical' && 'vertical', flexItem && 'flexItem', children && 'withChildren', children && orientation === 'vertical' && 'withChildrenVertical', textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight', textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft'],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical']
  };
  return (0, _composeClasses.default)(slots, _dividerClasses.getDividerUtilityClass, classes);
};
const DividerRoot = (0, _styled.default)('div', {
  name: 'MuiDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.absolute && styles.absolute, styles[ownerState.variant], ownerState.light && styles.light, ownerState.orientation === 'vertical' && styles.vertical, ownerState.flexItem && styles.flexItem, ownerState.children && styles.withChildren, ownerState.children && ownerState.orientation === 'vertical' && styles.withChildrenVertical, ownerState.textAlign === 'right' && ownerState.orientation !== 'vertical' && styles.textAlignRight, ownerState.textAlign === 'left' && ownerState.orientation !== 'vertical' && styles.textAlignLeft];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  margin: 0,
  // Reset browser default style.
  flexShrink: 0,
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: (theme.vars || theme).palette.divider,
  borderBottomWidth: 'thin'
}, ownerState.absolute && {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%'
}, ownerState.light && {
  borderColor: theme.vars ? `rgba(${theme.vars.palette.dividerChannel} / 0.08)` : (0, _colorManipulator.alpha)(theme.palette.divider, 0.08)
}, ownerState.variant === 'inset' && {
  marginLeft: 72
}, ownerState.variant === 'middle' && ownerState.orientation === 'horizontal' && {
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2)
}, ownerState.variant === 'middle' && ownerState.orientation === 'vertical' && {
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1)
}, ownerState.orientation === 'vertical' && {
  height: '100%',
  borderBottomWidth: 0,
  borderRightWidth: 'thin'
}, ownerState.flexItem && {
  alignSelf: 'stretch',
  height: 'auto'
}), ({
  ownerState
}) => (0, _extends2.default)({}, ownerState.children && {
  display: 'flex',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  border: 0,
  '&::before, &::after': {
    content: '""',
    alignSelf: 'center'
  }
}), ({
  theme,
  ownerState
}) => (0, _extends2.default)({}, ownerState.children && ownerState.orientation !== 'vertical' && {
  '&::before, &::after': {
    width: '100%',
    borderTop: `thin solid ${(theme.vars || theme).palette.divider}`
  }
}), ({
  theme,
  ownerState
}) => (0, _extends2.default)({}, ownerState.children && ownerState.orientation === 'vertical' && {
  flexDirection: 'column',
  '&::before, &::after': {
    height: '100%',
    borderLeft: `thin solid ${(theme.vars || theme).palette.divider}`
  }
}), ({
  ownerState
}) => (0, _extends2.default)({}, ownerState.textAlign === 'right' && ownerState.orientation !== 'vertical' && {
  '&::before': {
    width: '90%'
  },
  '&::after': {
    width: '10%'
  }
}, ownerState.textAlign === 'left' && ownerState.orientation !== 'vertical' && {
  '&::before': {
    width: '10%'
  },
  '&::after': {
    width: '90%'
  }
}));
const DividerWrapper = (0, _styled.default)('span', {
  name: 'MuiDivider',
  slot: 'Wrapper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.wrapper, ownerState.orientation === 'vertical' && styles.wrapperVertical];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  display: 'inline-block',
  paddingLeft: `calc(${theme.spacing(1)} * 1.2)`,
  paddingRight: `calc(${theme.spacing(1)} * 1.2)`
}, ownerState.orientation === 'vertical' && {
  paddingTop: `calc(${theme.spacing(1)} * 1.2)`,
  paddingBottom: `calc(${theme.spacing(1)} * 1.2)`
}));
const Divider = /*#__PURE__*/React.forwardRef(function Divider(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiDivider'
  });
  const {
      absolute = false,
      children,
      className,
      component = children ? 'div' : 'hr',
      flexItem = false,
      light = false,
      orientation = 'horizontal',
      role = component !== 'hr' ? 'separator' : undefined,
      textAlign = 'center',
      variant = 'fullWidth'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    absolute,
    component,
    flexItem,
    light,
    orientation,
    role,
    textAlign,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DividerRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    role: role,
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: children ? /*#__PURE__*/(0, _jsxRuntime.jsx)(DividerWrapper, {
      className: classes.wrapper,
      ownerState: ownerState,
      children: children
    }) : null
  }));
});

/**
 * The following flag is used to ensure that this component isn't tabbable i.e.
 * does not get highlight/focus inside of MUI List.
 */
Divider.muiSkipListHighlight = true;
process.env.NODE_ENV !== "production" ? Divider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: _propTypes.default.bool,
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: _propTypes.default.bool,
  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   * @deprecated Use <Divider sx={{ opacity: 0.6 }} /> (or any opacity or color) instead. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/)
   */
  light: _propTypes.default.bool,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: _propTypes.default /* @typescript-to-proptypes-ignore */.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: _propTypes.default.oneOf(['center', 'left', 'right']),
  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['fullWidth', 'inset', 'middle']), _propTypes.default.string])
} : void 0;
var _default = exports.default = Divider;