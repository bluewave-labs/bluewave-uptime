"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersInput = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _FormControl = require("@mui/material/FormControl");
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _pickersInputClasses = require("./pickersInputClasses");
var _PickersInputBase = require("../PickersInputBase");
var _PickersInputBase2 = require("../PickersInputBase/PickersInputBase");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["label", "autoFocus", "disableUnderline", "ownerState"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PickersInputRoot = (0, _styles.styled)(_PickersInputBase2.PickersInputBaseRoot, {
  name: 'MuiPickersInput',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => {
  const light = theme.palette.mode === 'light';
  let bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  if (theme.vars) {
    bottomLineColor = `rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})`;
  }
  return {
    'label + &': {
      marginTop: 16
    },
    variants: [...Object.keys((theme.vars ?? theme).palette)
    // @ts-ignore
    .filter(key => (theme.vars ?? theme).palette[key].main).map(color => ({
      props: {
        color
      },
      style: {
        '&::after': {
          // @ts-ignore
          borderBottom: `2px solid ${(theme.vars || theme).palette[color].main}`
        }
      }
    })), {
      props: {
        disableUnderline: false
      },
      style: {
        '&::after': {
          background: 'red',
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '""',
          position: 'absolute',
          right: 0,
          transform: 'scaleX(0)',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut
          }),
          pointerEvents: 'none' // Transparent to the hover style.
        },
        [`&.${_pickersInputClasses.pickersInputClasses.focused}:after`]: {
          // translateX(0) is a workaround for Safari transform scale bug
          // See https://github.com/mui/material-ui/issues/31766
          transform: 'scaleX(1) translateX(0)'
        },
        [`&.${_pickersInputClasses.pickersInputClasses.error}`]: {
          '&:before, &:after': {
            borderBottomColor: (theme.vars || theme).palette.error.main
          }
        },
        '&::before': {
          borderBottom: `1px solid ${bottomLineColor}`,
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '"\\00a0"',
          position: 'absolute',
          right: 0,
          transition: theme.transitions.create('border-bottom-color', {
            duration: theme.transitions.duration.shorter
          }),
          pointerEvents: 'none' // Transparent to the hover style.
        },
        [`&:hover:not(.${_pickersInputClasses.pickersInputClasses.disabled}, .${_pickersInputClasses.pickersInputClasses.error}):before`]: {
          borderBottom: `2px solid ${(theme.vars || theme).palette.text.primary}`,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            borderBottom: `1px solid ${bottomLineColor}`
          }
        },
        [`&.${_pickersInputClasses.pickersInputClasses.disabled}:before`]: {
          borderBottomStyle: 'dotted'
        }
      }
    }]
  };
});
const useUtilityClasses = ownerState => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ['root', !disableUnderline && 'underline'],
    input: ['input']
  };
  const composedClasses = (0, _composeClasses.default)(slots, _pickersInputClasses.getPickersInputUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};
/**
 * @ignore - internal component.
 */
const PickersInput = exports.PickersInput = /*#__PURE__*/React.forwardRef(function PickersInput(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersInput'
  });
  const {
      label,
      disableUnderline = false,
      ownerState: ownerStateProp
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const muiFormControl = (0, _FormControl.useFormControl)();
  const ownerState = (0, _extends2.default)({}, props, ownerStateProp, muiFormControl, {
    disableUnderline,
    color: muiFormControl?.color || 'primary'
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersInputBase.PickersInputBase, (0, _extends2.default)({
    slots: {
      root: PickersInputRoot
    }
  }, other, {
    label: label,
    classes: classes,
    ref: ref
  }));
});
process.env.NODE_ENV !== "production" ? PickersInput.propTypes = {
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
  disableUnderline: _propTypes.default.bool,
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
PickersInput.muiName = 'Input';