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
var _Add = _interopRequireDefault(require("../internal/svg-icons/Add"));
var _speedDialIconClasses = _interopRequireWildcard(require("./speedDialIconClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "icon", "open", "openIcon"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    open,
    openIcon
  } = ownerState;
  const slots = {
    root: ['root'],
    icon: ['icon', open && 'iconOpen', openIcon && open && 'iconWithOpenIconOpen'],
    openIcon: ['openIcon', open && 'openIconOpen']
  };
  return (0, _composeClasses.default)(slots, _speedDialIconClasses.getSpeedDialIconUtilityClass, classes);
};
const SpeedDialIconRoot = (0, _styled.default)('span', {
  name: 'MuiSpeedDialIcon',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${_speedDialIconClasses.default.icon}`]: styles.icon
    }, {
      [`& .${_speedDialIconClasses.default.icon}`]: ownerState.open && styles.iconOpen
    }, {
      [`& .${_speedDialIconClasses.default.icon}`]: ownerState.open && ownerState.openIcon && styles.iconWithOpenIconOpen
    }, {
      [`& .${_speedDialIconClasses.default.openIcon}`]: styles.openIcon
    }, {
      [`& .${_speedDialIconClasses.default.openIcon}`]: ownerState.open && styles.openIconOpen
    }, styles.root];
  }
})(({
  theme,
  ownerState
}) => ({
  height: 24,
  [`& .${_speedDialIconClasses.default.icon}`]: (0, _extends2.default)({
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    })
  }, ownerState.open && (0, _extends2.default)({
    transform: 'rotate(45deg)'
  }, ownerState.openIcon && {
    opacity: 0
  })),
  [`& .${_speedDialIconClasses.default.openIcon}`]: (0, _extends2.default)({
    position: 'absolute',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    transform: 'rotate(-45deg)'
  }, ownerState.open && {
    transform: 'rotate(0deg)',
    opacity: 1
  })
}));
const SpeedDialIcon = /*#__PURE__*/React.forwardRef(function SpeedDialIcon(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSpeedDialIcon'
  });
  const {
      className,
      icon: iconProp,
      openIcon: openIconProp
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  function formatIcon(icon, newClassName) {
    if ( /*#__PURE__*/React.isValidElement(icon)) {
      return /*#__PURE__*/React.cloneElement(icon, {
        className: newClassName
      });
    }
    return icon;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SpeedDialIconRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: [openIconProp ? formatIcon(openIconProp, classes.openIcon) : null, iconProp ? formatIcon(iconProp, classes.icon) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Add.default, {
      className: classes.icon
    })]
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDialIcon.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * @ignore
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: _propTypes.default.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;
SpeedDialIcon.muiName = 'SpeedDialIcon';
var _default = exports.default = SpeedDialIcon;