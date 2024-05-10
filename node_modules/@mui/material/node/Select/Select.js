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
var _deepmerge = _interopRequireDefault(require("@mui/utils/deepmerge"));
var _SelectInput = _interopRequireDefault(require("./SelectInput"));
var _formControlState = _interopRequireDefault(require("../FormControl/formControlState"));
var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));
var _ArrowDropDown = _interopRequireDefault(require("../internal/svg-icons/ArrowDropDown"));
var _Input = _interopRequireDefault(require("../Input"));
var _NativeSelectInput = _interopRequireDefault(require("../NativeSelect/NativeSelectInput"));
var _FilledInput = _interopRequireDefault(require("../FilledInput"));
var _OutlinedInput = _interopRequireDefault(require("../OutlinedInput"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));
var _styled = _interopRequireWildcard(require("../styles/styled"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["autoWidth", "children", "classes", "className", "defaultOpen", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"],
  _excluded2 = ["root"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  return classes;
};
const styledRootConfig = {
  name: 'MuiSelect',
  overridesResolver: (props, styles) => styles.root,
  shouldForwardProp: prop => (0, _styled.rootShouldForwardProp)(prop) && prop !== 'variant',
  slot: 'Root'
};
const StyledInput = (0, _styled.default)(_Input.default, styledRootConfig)('');
const StyledOutlinedInput = (0, _styled.default)(_OutlinedInput.default, styledRootConfig)('');
const StyledFilledInput = (0, _styled.default)(_FilledInput.default, styledRootConfig)('');
const Select = /*#__PURE__*/React.forwardRef(function Select(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    name: 'MuiSelect',
    props: inProps
  });
  const {
      autoWidth = false,
      children,
      classes: classesProp = {},
      className,
      defaultOpen = false,
      displayEmpty = false,
      IconComponent = _ArrowDropDown.default,
      id,
      input,
      inputProps,
      label,
      labelId,
      MenuProps,
      multiple = false,
      native = false,
      onClose,
      onOpen,
      open,
      renderValue,
      SelectDisplayProps,
      variant: variantProp = 'outlined'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const inputComponent = native ? _NativeSelectInput.default : _SelectInput.default;
  const muiFormControl = (0, _useFormControl.default)();
  const fcs = (0, _formControlState.default)({
    props,
    muiFormControl,
    states: ['variant', 'error']
  });
  const variant = fcs.variant || variantProp;
  const ownerState = (0, _extends2.default)({}, props, {
    variant,
    classes: classesProp
  });
  const classes = useUtilityClasses(ownerState);
  const restOfClasses = (0, _objectWithoutPropertiesLoose2.default)(classes, _excluded2);
  const InputComponent = input || {
    standard: /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledInput, {
      ownerState: ownerState
    }),
    outlined: /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledOutlinedInput, {
      label: label,
      ownerState: ownerState
    }),
    filled: /*#__PURE__*/(0, _jsxRuntime.jsx)(StyledFilledInput, {
      ownerState: ownerState
    })
  }[variant];
  const inputComponentRef = (0, _useForkRef.default)(ref, InputComponent.ref);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(React.Fragment, {
    children: /*#__PURE__*/React.cloneElement(InputComponent, (0, _extends2.default)({
      // Most of the logic is implemented in `SelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent,
      inputProps: (0, _extends2.default)({
        children,
        error: fcs.error,
        IconComponent,
        variant,
        type: undefined,
        // We render a select. We can ignore the type provided by the `Input`.
        multiple
      }, native ? {
        id
      } : {
        autoWidth,
        defaultOpen,
        displayEmpty,
        labelId,
        MenuProps,
        onClose,
        onOpen,
        open,
        renderValue,
        SelectDisplayProps: (0, _extends2.default)({
          id
        }, SelectDisplayProps)
      }, inputProps, {
        classes: inputProps ? (0, _deepmerge.default)(restOfClasses, inputProps.classes) : restOfClasses
      }, input ? input.props.inputProps : {})
    }, (multiple && native || displayEmpty) && variant === 'outlined' ? {
      notched: true
    } : {}, {
      ref: inputComponentRef,
      className: (0, _clsx.default)(InputComponent.props.className, className, classes.root)
    }, !input && {
      variant
    }, other))
  });
});
process.env.NODE_ENV !== "production" ? Select.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   * @default false
   */
  autoWidth: _propTypes.default.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   *
   * ⚠️The `MenuItem` elements **must** be direct descendants when `native` is false.
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
   * If `true`, the component is initially open. Use when the component open state is not controlled (i.e. the `open` prop is not defined).
   * You can only use it when the `native` prop is `false` (default).
   * @default false
   */
  defaultOpen: _propTypes.default.bool,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.any,
  /**
   * If `true`, a value is displayed even if no items are selected.
   *
   * In order to display a meaningful value, a function can be passed to the `renderValue` prop which
   * returns the value to be displayed when no items are selected.
   *
   * ⚠️ When using this prop, make sure the label doesn't overlap with the empty displayed value.
   * The label should either be hidden or forced to a shrunk state.
   * @default false
   */
  displayEmpty: _propTypes.default.bool,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: _propTypes.default.elementType,
  /**
   * The `id` of the wrapper element or the `select` element when `native`.
   */
  id: _propTypes.default.string,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: _propTypes.default.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: _propTypes.default.object,
  /**
   * See [OutlinedInput#label](/material-ui/api/outlined-input/#props)
   */
  label: _propTypes.default.node,
  /**
   * The ID of an element that acts as an additional label. The Select will
   * be labelled by the additional label and the selected value.
   */
  labelId: _propTypes.default.string,
  /**
   * Props applied to the [`Menu`](/material-ui/api/menu/) element.
   */
  MenuProps: _propTypes.default.object,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: _propTypes.default.bool,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: _propTypes.default.bool,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {SelectChangeEvent<Value>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event, not a change event, unless the change event is caused by browser autofill.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select collapses).
   *
   * @param {object} event The event source of the callback.
   */
  onClose: _propTypes.default.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use it in either controlled (see the `open` prop), or uncontrolled mode (to detect when the Select expands).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: _propTypes.default.func,
  /**
   * If `true`, the component is shown.
   * You can only use it when the `native` prop is `false` (default).
   */
  open: _propTypes.default.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` prop is `false` (default).
   *
   * @param {any} value The `value` provided to the component.
   * @returns {ReactNode}
   */
  renderValue: _propTypes.default.func,
  /**
   * Props applied to the clickable div element.
   */
  SelectDisplayProps: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The `input` value. Providing an empty string will select no options.
   * Set to an empty string `''` if you don't want any of the available options to be selected.
   *
   * If the value is an object it must have reference equality with the option in order to be selected.
   * If the value is not an object, the string representation must match with the string representation of the option in order to be selected.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.oneOf(['']), _propTypes.default.any]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: _propTypes.default.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
Select.muiName = 'Select';
var _default = exports.default = Select;