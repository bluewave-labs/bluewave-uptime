"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isHostComponent = require("../utils/isHostComponent");
var _inputClasses = require("./inputClasses");
var _useInput = require("../useInput");
var _utils = require("../utils");
var _composeClasses = require("../composeClasses");
var _ClassNameConfigurator = require("../utils/ClassNameConfigurator");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "defaultValue", "disabled", "endAdornment", "error", "id", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "startAdornment", "value", "type", "rows", "slotProps", "slots", "minRows", "maxRows"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    disabled,
    error,
    focused,
    formControlContext,
    multiline,
    startAdornment,
    endAdornment
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', error && 'error', focused && 'focused', Boolean(formControlContext) && 'formControl', multiline && 'multiline', Boolean(startAdornment) && 'adornedStart', Boolean(endAdornment) && 'adornedEnd'],
    input: ['input', disabled && 'disabled', multiline && 'multiline']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, (0, _ClassNameConfigurator.useClassNamesOverride)(_inputClasses.getInputUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Input](https://mui.com/base-ui/react-input/)
 *
 * API:
 *
 * - [Input API](https://mui.com/base-ui/react-input/components-api/#input)
 */
const Input = exports.Input = /*#__PURE__*/React.forwardRef(function Input(props, forwardedRef) {
  var _slots$root, _slots$textarea, _slots$input;
  const {
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      autoComplete,
      autoFocus,
      className,
      defaultValue,
      disabled,
      endAdornment,
      error,
      id,
      multiline = false,
      name,
      onClick,
      onChange,
      onKeyDown,
      onKeyUp,
      onFocus,
      onBlur,
      placeholder,
      readOnly,
      required,
      startAdornment,
      value,
      type: typeProp,
      rows,
      slotProps = {},
      slots = {},
      minRows,
      maxRows
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState
  } = (0, _useInput.useInput)({
    disabled,
    defaultValue,
    error,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required,
    value
  });
  const type = !multiline ? typeProp != null ? typeProp : 'text' : undefined;
  const ownerState = (0, _extends2.default)({}, props, {
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    multiline,
    type
  });
  const classes = useUtilityClasses(ownerState);
  const propsToForward = {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type
  };
  const Root = (_slots$root = slots.root) != null ? _slots$root : 'div';
  const rootProps = (0, _utils.useSlotProps)({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState,
    className: [classes.root, className]
  });
  const InputComponent = multiline ? (_slots$textarea = slots.textarea) != null ? _slots$textarea : 'textarea' : (_slots$input = slots.input) != null ? _slots$input : 'input';
  const inputProps = (0, _utils.useSlotProps)({
    elementType: InputComponent,
    getSlotProps: otherHandlers => {
      return getInputProps((0, _extends2.default)({}, propsToForward, otherHandlers));
    },
    externalSlotProps: slotProps.input,
    additionalProps: (0, _extends2.default)({
      rows: multiline ? rows : undefined
    }, multiline && !(0, _isHostComponent.isHostComponent)(InputComponent) && {
      minRows: rows || minRows,
      maxRows: rows || maxRows
    }),
    ownerState,
    className: classes.input
  });
  if (process.env.NODE_ENV !== 'production') {
    if (multiline) {
      if (rows) {
        if (minRows || maxRows) {
          console.warn('MUI: You can not use the `minRows` or `maxRows` props when the input `rows` prop is set.');
        }
      }
    }
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(Root, (0, _extends2.default)({}, rootProps, {
    children: [startAdornment, /*#__PURE__*/(0, _jsxRuntime.jsx)(InputComponent, (0, _extends2.default)({}, inputProps)), endAdornment]
  }));
});
process.env.NODE_ENV !== "production" ? Input.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  'aria-describedby': _propTypes.default.string,
  /**
   * @ignore
   */
  'aria-label': _propTypes.default.string,
  /**
   * @ignore
   */
  'aria-labelledby': _propTypes.default.string,
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: _propTypes.default.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: _propTypes.default.bool,
  /**
   * Class name applied to the root element.
   */
  className: _propTypes.default.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: _propTypes.default.bool,
  /**
   * Trailing adornment for this input.
   */
  endAdornment: _propTypes.default.node,
  /**
   * If `true`, the `input` will indicate an error by setting the `aria-invalid` attribute on the input and the `baseui--error` class on the root element.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: _propTypes.default.bool,
  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,
  /**
   * @ignore
   */
  inputRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.object
  })]),
  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: _propTypes.default.number,
  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: _propTypes.default.number,
  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: _propTypes.default.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,
  /**
   * @ignore
   */
  onBlur: _propTypes.default.func,
  /**
   * @ignore
   */
  onChange: _propTypes.default.func,
  /**
   * @ignore
   */
  onClick: _propTypes.default.func,
  /**
   * @ignore
   */
  onFocus: _propTypes.default.func,
  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,
  /**
   * @ignore
   */
  onKeyUp: _propTypes.default.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: _propTypes.default.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: _propTypes.default.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: _propTypes.default.bool,
  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: _propTypes.default.number,
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    input: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: _propTypes.default.shape({
    input: _propTypes.default.elementType,
    root: _propTypes.default.elementType,
    textarea: _propTypes.default.elementType
  }),
  /**
   * Leading adornment for this input.
   */
  startAdornment: _propTypes.default.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOf(['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week']),
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: _propTypes.default.any
} : void 0;