"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersOutlinedInput = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _FormControl = require("@mui/material/FormControl");
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _pickersOutlinedInputClasses = require("./pickersOutlinedInputClasses");
var _Outline = _interopRequireDefault(require("./Outline"));
var _PickersInputBase = require("../PickersInputBase");
var _PickersInputBase2 = require("../PickersInputBase/PickersInputBase");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["label", "autoFocus", "ownerState", "notched"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PickersOutlinedInputRoot = (0, _styles.styled)(_PickersInputBase2.PickersInputBaseRoot, {
  name: 'MuiPickersOutlinedInput',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => {
  const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    padding: '0 14px',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    [`&:hover .${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.text.primary
    },
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      [`&:hover .${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.vars ? `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)` : borderColor
      }
    },
    [`&.${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.focused} .${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.notchedOutline}`]: {
      borderStyle: 'solid',
      borderWidth: 2
    },
    [`&.${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.disabled}`]: {
      [`& .${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.notchedOutline}`]: {
        borderColor: (theme.vars || theme).palette.action.disabled
      },
      '*': {
        color: (theme.vars || theme).palette.action.disabled
      }
    },
    [`&.${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.error} .${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.notchedOutline}`]: {
      borderColor: (theme.vars || theme).palette.error.main
    },
    variants: Object.keys((theme.vars ?? theme).palette)
    // @ts-ignore
    .filter(key => (theme.vars ?? theme).palette[key].main).map(color => ({
      props: {
        color
      },
      style: {
        [`&.${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.focused}:not(.${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.error}) .${_pickersOutlinedInputClasses.pickersOutlinedInputClasses.notchedOutline}`]: {
          // @ts-ignore
          borderColor: (theme.vars || theme).palette[color].main
        }
      }
    }))
  };
});
const PickersOutlinedInputSectionsContainer = (0, _styles.styled)(_PickersInputBase2.PickersInputBaseSectionsContainer, {
  name: 'MuiPickersOutlinedInput',
  slot: 'SectionsContainer',
  overridesResolver: (props, styles) => styles.sectionsContainer
})({
  padding: '16.5px 0',
  variants: [{
    props: {
      size: 'small'
    },
    style: {
      padding: '8.5px 0'
    }
  }]
});
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    notchedOutline: ['notchedOutline'],
    input: ['input']
  };
  const composedClasses = (0, _composeClasses.default)(slots, _pickersOutlinedInputClasses.getPickersOutlinedInputUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};
/**
 * @ignore - internal component.
 */
const PickersOutlinedInput = exports.PickersOutlinedInput = /*#__PURE__*/React.forwardRef(function PickersOutlinedInput(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersOutlinedInput'
  });
  const {
      label,
      ownerState: ownerStateProp,
      notched
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const muiFormControl = (0, _FormControl.useFormControl)();
  const ownerState = (0, _extends2.default)({}, props, ownerStateProp, muiFormControl, {
    color: muiFormControl?.color || 'primary'
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersInputBase.PickersInputBase, (0, _extends2.default)({
    slots: {
      root: PickersOutlinedInputRoot,
      input: PickersOutlinedInputSectionsContainer
    },
    renderSuffix: state => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Outline.default, {
      shrink: Boolean(notched || state.adornedStart || state.focused || state.filled),
      notched: Boolean(notched || state.adornedStart || state.focused || state.filled),
      className: classes.notchedOutline,
      label: label != null && label !== '' && muiFormControl?.required ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
        children: [label, "\u2009", '*']
      }) : label,
      ownerState: ownerState
    })
  }, other, {
    label: label,
    classes: classes,
    ref: ref
  }));
});
process.env.NODE_ENV !== "production" ? PickersOutlinedInput.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Is `true` if the current values equals the empty value.
   * For a single item value, it means that `value === null`
   * For a range value, it means that `value === [null, null]`
   */
  areAllSectionsEmpty: _propTypes.default.bool.isRequired,
  className: _propTypes.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: _propTypes.default.bool.isRequired,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: _propTypes.default.arrayOf(_propTypes.default.shape({
    after: _propTypes.default.object.isRequired,
    before: _propTypes.default.object.isRequired,
    container: _propTypes.default.object.isRequired,
    content: _propTypes.default.object.isRequired
  })).isRequired,
  endAdornment: _propTypes.default.node,
  fullWidth: _propTypes.default.bool,
  id: _propTypes.default.string,
  inputProps: _propTypes.default.object,
  inputRef: _utils.refType,
  label: _propTypes.default.node,
  margin: _propTypes.default.oneOf(['dense', 'none', 'normal']),
  name: _propTypes.default.string,
  notched: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  onClick: _propTypes.default.func.isRequired,
  onInput: _propTypes.default.func.isRequired,
  onKeyDown: _propTypes.default.func.isRequired,
  onPaste: _propTypes.default.func.isRequired,
  ownerState: _propTypes.default.any,
  readOnly: _propTypes.default.bool,
  renderSuffix: _propTypes.default.func,
  sectionListRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.shape({
      getRoot: _propTypes.default.func.isRequired,
      getSectionContainer: _propTypes.default.func.isRequired,
      getSectionContent: _propTypes.default.func.isRequired,
      getSectionIndexFromDOMElement: _propTypes.default.func.isRequired
    })
  })]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: _propTypes.default.object,
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: _propTypes.default.object,
  startAdornment: _propTypes.default.node,
  style: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  value: _propTypes.default.string.isRequired
} : void 0;
PickersOutlinedInput.muiName = 'Input';