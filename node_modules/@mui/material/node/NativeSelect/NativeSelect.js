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
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _NativeSelectInput = _interopRequireDefault(require("./NativeSelectInput"));
var _formControlState = _interopRequireDefault(require("../FormControl/formControlState"));
var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));
var _ArrowDropDown = _interopRequireDefault(require("../internal/svg-icons/ArrowDropDown"));
var _Input = _interopRequireDefault(require("../Input"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _nativeSelectClasses = require("./nativeSelectClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["className", "children", "classes", "IconComponent", "input", "inputProps", "variant"],
  _excluded2 = ["root"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _composeClasses.default)(slots, _nativeSelectClasses.getNativeSelectUtilityClasses, classes);
};
const defaultInput = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Input.default, {});
/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 */
const NativeSelect = /*#__PURE__*/React.forwardRef(function NativeSelect(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    name: 'MuiNativeSelect',
    props: inProps
  });
  const {
      className,
      children,
      classes: classesProp = {},
      IconComponent = _ArrowDropDown.default,
      input = defaultInput,
      inputProps
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const muiFormControl = (0, _useFormControl.default)();
  const fcs = (0, _formControlState.default)({
    props,
    muiFormControl,
    states: ['variant']
  });
  const ownerState = (0, _extends2.default)({}, props, {
    classes: classesProp
  });
  const classes = useUtilityClasses(ownerState);
  const otherClasses = (0, _objectWithoutPropertiesLoose2.default)(classesProp, _excluded2);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
    children: /*#__PURE__*/React.cloneElement(input, (0, _extends2.default)({
      // Most of the logic is implemented in `NativeSelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent: _NativeSelectInput.default,
      inputProps: (0, _extends2.default)({
        children,
        classes: otherClasses,
        IconComponent,
        variant: fcs.variant,
        type: undefined
      }, inputProps, input ? input.props.inputProps : {}),
      ref
    }, other, {
      className: (0, _clsx.default)(classes.root, input.props.className, className)
    }))
  });
});
process.env.NODE_ENV !== "production" ? NativeSelect.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: _propTypes.default.elementType,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   * @default <Input />
   */
  input: _propTypes.default.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attributes) applied to the `select` element.
   */
  inputProps: _propTypes.default.object,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The `input` value. The DOM API casts this to a string.
   */
  value: _propTypes.default.any,
  /**
   * The variant to use.
   */
  variant: _propTypes.default.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
NativeSelect.muiName = 'Select';
var _default = exports.default = NativeSelect;