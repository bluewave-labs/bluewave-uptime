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
var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));
var _unsupportedProp = _interopRequireDefault(require("../utils/unsupportedProp"));
var _bottomNavigationActionClasses = _interopRequireWildcard(require("./bottomNavigationActionClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "icon", "label", "onChange", "onClick", "selected", "showLabel", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    showLabel,
    selected
  } = ownerState;
  const slots = {
    root: ['root', !showLabel && !selected && 'iconOnly', selected && 'selected'],
    label: ['label', !showLabel && !selected && 'iconOnly', selected && 'selected']
  };
  return (0, _composeClasses.default)(slots, _bottomNavigationActionClasses.getBottomNavigationActionUtilityClass, classes);
};
const BottomNavigationActionRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiBottomNavigationAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.showLabel && !ownerState.selected && styles.iconOnly];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  transition: theme.transitions.create(['color', 'padding-top'], {
    duration: theme.transitions.duration.short
  }),
  padding: '0px 12px',
  minWidth: 80,
  maxWidth: 168,
  color: (theme.vars || theme).palette.text.secondary,
  flexDirection: 'column',
  flex: '1'
}, !ownerState.showLabel && !ownerState.selected && {
  paddingTop: 14
}, !ownerState.showLabel && !ownerState.selected && !ownerState.label && {
  paddingTop: 0
}, {
  [`&.${_bottomNavigationActionClasses.default.selected}`]: {
    color: (theme.vars || theme).palette.primary.main
  }
}));
const BottomNavigationActionLabel = (0, _styled.default)('span', {
  name: 'MuiBottomNavigationAction',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(12),
  opacity: 1,
  transition: 'font-size 0.2s, opacity 0.2s',
  transitionDelay: '0.1s'
}, !ownerState.showLabel && !ownerState.selected && {
  opacity: 0,
  transitionDelay: '0s'
}, {
  [`&.${_bottomNavigationActionClasses.default.selected}`]: {
    fontSize: theme.typography.pxToRem(14)
  }
}));
const BottomNavigationAction = /*#__PURE__*/React.forwardRef(function BottomNavigationAction(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiBottomNavigationAction'
  });
  const {
      className,
      icon,
      label,
      onChange,
      onClick
      // eslint-disable-next-line react/prop-types -- private, always overridden by BottomNavigation
      ,

      value
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const handleChange = event => {
    if (onChange) {
      onChange(event, value);
    }
    if (onClick) {
      onClick(event);
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(BottomNavigationActionRoot, (0, _extends2.default)({
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    focusRipple: true,
    onClick: handleChange,
    ownerState: ownerState
  }, other, {
    children: [icon, /*#__PURE__*/(0, _jsxRuntime.jsx)(BottomNavigationActionLabel, {
      className: classes.label,
      ownerState: ownerState,
      children: label
    })]
  }));
});
process.env.NODE_ENV !== "production" ? BottomNavigationAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: _unsupportedProp.default,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The icon to display.
   */
  icon: _propTypes.default.node,
  /**
   * The label element.
   */
  label: _propTypes.default.node,
  /**
   * @ignore
   */
  onChange: _propTypes.default.func,
  /**
   * @ignore
   */
  onClick: _propTypes.default.func,
  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel: _propTypes.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: _propTypes.default.any
} : void 0;
var _default = exports.default = BottomNavigationAction;