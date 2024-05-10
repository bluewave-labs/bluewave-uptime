"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _composeClasses = require("../composeClasses");
var _optionClasses = require("./optionClasses");
var _utils2 = require("../utils");
var _useOption = require("../useOption");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _useList = require("../useList");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "disabled", "label", "slotProps", "slots", "value"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function useUtilityClasses(ownerState) {
  const {
    disabled,
    highlighted,
    selected
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', highlighted && 'highlighted', selected && 'selected']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_optionClasses.getOptionUtilityClass));
}
const InnerOption = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function Option(props, forwardedRef) {
  var _slots$root, _optionRef$current;
  const {
      children,
      disabled = false,
      label,
      slotProps = {},
      slots = {},
      value
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const Root = (_slots$root = slots.root) != null ? _slots$root : 'li';
  const optionRef = React.useRef(null);
  const combinedRef = (0, _utils.unstable_useForkRef)(optionRef, forwardedRef);

  // If `label` is not explicitly provided, the `children` are used for convenience.
  // This is used to populate the select's trigger with the selected option's label.
  const computedLabel = label != null ? label : typeof children === 'string' ? children : (_optionRef$current = optionRef.current) == null || (_optionRef$current = _optionRef$current.textContent) == null ? void 0 : _optionRef$current.trim();
  const {
    getRootProps,
    selected,
    highlighted,
    index
  } = (0, _useOption.useOption)({
    disabled,
    label: computedLabel,
    rootRef: combinedRef,
    value
  });
  const ownerState = (0, _extends2.default)({}, props, {
    disabled,
    highlighted,
    index,
    selected
  });
  const classes = useUtilityClasses(ownerState);
  const rootProps = (0, _utils2.useSlotProps)({
    getSlotProps: getRootProps,
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    className: classes.root,
    ownerState
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Root, (0, _extends2.default)({}, rootProps, {
    children: children
  }));
}));

/**
 * An unstyled option to be used within a Select.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base-ui/react-select/)
 *
 * API:
 *
 * - [Option API](https://mui.com/base-ui/react-select/components-api/#option)
 */
const Option = exports.Option = /*#__PURE__*/React.forwardRef(function Option(props, ref) {
  const {
    value
  } = props;

  // This wrapper component is used as a performance optimization.
  // `useOptionContextStabilizer` ensures that the context value
  // is stable across renders, so that the actual Option re-renders
  // only when it needs to.
  const {
    contextValue
  } = (0, _useOption.useOptionContextStabilizer)(value);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_useList.ListContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(InnerOption, (0, _extends2.default)({}, props, {
      ref: ref
    }))
  });
});
process.env.NODE_ENV !== "production" ? Option.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * If `true`, the option will be disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * A text representation of the option's content.
   * Used for keyboard text navigation matching.
   */
  label: _propTypes.default.string,
  /**
   * The props used for each slot inside the Option.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the Option.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    root: _propTypes.default.elementType
  }),
  /**
   * The value of the option.
   */
  value: _propTypes.default.any.isRequired
} : void 0;