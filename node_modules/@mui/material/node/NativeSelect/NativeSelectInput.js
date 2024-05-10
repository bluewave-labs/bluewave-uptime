"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nativeSelectSelectStyles = exports.nativeSelectIconStyles = exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _refType = _interopRequireDefault(require("@mui/utils/refType"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _nativeSelectClasses = _interopRequireWildcard(require("./nativeSelectClasses"));
var _styled = _interopRequireWildcard(require("../styles/styled"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "disabled", "error", "IconComponent", "inputRef", "variant"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    variant,
    disabled,
    multiple,
    open,
    error
  } = ownerState;
  const slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', `icon${(0, _capitalize.default)(variant)}`, open && 'iconOpen', disabled && 'disabled']
  };
  return (0, _composeClasses.default)(slots, _nativeSelectClasses.getNativeSelectUtilityClasses, classes);
};
const nativeSelectSelectStyles = ({
  ownerState,
  theme
}) => (0, _extends2.default)({
  MozAppearance: 'none',
  // Reset
  WebkitAppearance: 'none',
  // Reset
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: 'none',
  borderRadius: 0,
  // Reset
  cursor: 'pointer',
  '&:focus': (0, _extends2.default)({}, theme.vars ? {
    backgroundColor: `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.05)`
  } : {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'
  }, {
    borderRadius: 0 // Reset Chrome style
  }),
  // Remove IE11 arrow
  '&::-ms-expand': {
    display: 'none'
  },
  [`&.${_nativeSelectClasses.default.disabled}`]: {
    cursor: 'default'
  },
  '&[multiple]': {
    height: 'auto'
  },
  '&:not([multiple]) option, &:not([multiple]) optgroup': {
    backgroundColor: (theme.vars || theme).palette.background.paper
  },
  // Bump specificity to allow extending custom inputs
  '&&&': {
    paddingRight: 24,
    minWidth: 16 // So it doesn't collapse.
  }
}, ownerState.variant === 'filled' && {
  '&&&': {
    paddingRight: 32
  }
}, ownerState.variant === 'outlined' && {
  borderRadius: (theme.vars || theme).shape.borderRadius,
  '&:focus': {
    borderRadius: (theme.vars || theme).shape.borderRadius // Reset the reset for Chrome style
  },
  '&&&': {
    paddingRight: 32
  }
});
exports.nativeSelectSelectStyles = nativeSelectSelectStyles;
const NativeSelectSelect = (0, _styled.default)('select', {
  name: 'MuiNativeSelect',
  slot: 'Select',
  shouldForwardProp: _styled.rootShouldForwardProp,
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.select, styles[ownerState.variant], ownerState.error && styles.error, {
      [`&.${_nativeSelectClasses.default.multiple}`]: styles.multiple
    }];
  }
})(nativeSelectSelectStyles);
const nativeSelectIconStyles = ({
  ownerState,
  theme
}) => (0, _extends2.default)({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: 'absolute',
  right: 0,
  top: 'calc(50% - .5em)',
  // Center vertically, height is 1em
  pointerEvents: 'none',
  // Don't block pointer events on the select under the icon.
  color: (theme.vars || theme).palette.action.active,
  [`&.${_nativeSelectClasses.default.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  }
}, ownerState.open && {
  transform: 'rotate(180deg)'
}, ownerState.variant === 'filled' && {
  right: 7
}, ownerState.variant === 'outlined' && {
  right: 7
});
exports.nativeSelectIconStyles = nativeSelectIconStyles;
const NativeSelectIcon = (0, _styled.default)('svg', {
  name: 'MuiNativeSelect',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.icon, ownerState.variant && styles[`icon${(0, _capitalize.default)(ownerState.variant)}`], ownerState.open && styles.iconOpen];
  }
})(nativeSelectIconStyles);

/**
 * @ignore - internal component.
 */
const NativeSelectInput = /*#__PURE__*/React.forwardRef(function NativeSelectInput(props, ref) {
  const {
      className,
      disabled,
      error,
      IconComponent,
      inputRef,
      variant = 'standard'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    disabled,
    variant,
    error
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(NativeSelectSelect, (0, _extends2.default)({
      ownerState: ownerState,
      className: (0, _clsx.default)(classes.select, className),
      disabled: disabled,
      ref: inputRef || ref
    }, other)), props.multiple ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(NativeSelectIcon, {
      as: IconComponent,
      ownerState: ownerState,
      className: classes.icon
    })]
  });
});
process.env.NODE_ENV !== "production" ? NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * The CSS class name of the select element.
   */
  className: _propTypes.default.string,
  /**
   * If `true`, the select is disabled.
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: _propTypes.default.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: _propTypes.default.elementType.isRequired,
  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: _refType.default,
  /**
   * @ignore
   */
  multiple: _propTypes.default.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: _propTypes.default.string,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,
  /**
   * The input value.
   */
  value: _propTypes.default.any,
  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['standard', 'outlined', 'filled'])
} : void 0;
var _default = exports.default = NativeSelectInput;