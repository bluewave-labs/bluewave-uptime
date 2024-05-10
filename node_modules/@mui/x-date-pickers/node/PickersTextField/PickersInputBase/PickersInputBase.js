"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersInputBaseSectionsContainer = exports.PickersInputBaseRoot = exports.PickersInputBase = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _FormControl = require("@mui/material/FormControl");
var _styles = require("@mui/material/styles");
var _useForkRef = _interopRequireDefault(require("@mui/utils/useForkRef"));
var _utils = require("@mui/utils");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _capitalize = _interopRequireDefault(require("@mui/utils/capitalize"));
var _utils2 = require("@mui/base/utils");
var _visuallyHidden = _interopRequireDefault(require("@mui/utils/visuallyHidden"));
var _pickersInputBaseClasses = require("./pickersInputBaseClasses");
var _PickersSectionList = require("../../PickersSectionList");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["elements", "areAllSectionsEmpty", "defaultValue", "label", "value", "onChange", "id", "autoFocus", "endAdornment", "startAdornment", "renderSuffix", "slots", "slotProps", "contentEditable", "tabIndex", "onInput", "onPaste", "onKeyDown", "fullWidth", "name", "readOnly", "inputProps", "inputRef", "sectionListRef"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const round = value => Math.round(value * 1e5) / 1e5;
const PickersInputBaseRoot = exports.PickersInputBaseRoot = (0, _styles.styled)('div', {
  name: 'MuiPickersInputBase',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => (0, _extends2.default)({}, theme.typography.body1, {
  color: (theme.vars || theme).palette.text.primary,
  cursor: 'text',
  padding: 0,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  // Prevent padding issue with fullWidth.
  letterSpacing: `${round(0.15 / 16)}em`,
  variants: [{
    props: {
      fullWidth: true
    },
    style: {
      width: '100%'
    }
  }]
}));
const PickersInputBaseSectionsContainer = exports.PickersInputBaseSectionsContainer = (0, _styles.styled)(_PickersSectionList.Unstable_PickersSectionListRoot, {
  name: 'MuiPickersInputBase',
  slot: 'SectionsContainer',
  overridesResolver: (props, styles) => styles.sectionsContainer
})(({
  theme
}) => (0, _extends2.default)({
  padding: '4px 0 5px',
  fontFamily: theme.typography.fontFamily,
  fontSize: 'inherit',
  lineHeight: '1.4375em',
  // 23px
  flexGrow: 1,
  outline: 'none',
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  letterSpacing: 'inherit',
  // Baseline behavior
  width: '182px'
}, theme.direction === 'rtl' && {
  textAlign: 'right /*! @noflip */'
}, {
  variants: [{
    props: {
      size: 'small'
    },
    style: {
      paddingTop: 1
    }
  }, {
    props: {
      adornedStart: false,
      focused: false,
      filled: false
    },
    style: {
      color: 'currentColor',
      opacity: 0
    }
  }, {
    // Can't use the object notation because label can be null or undefined
    props: ({
      adornedStart,
      focused,
      filled,
      label
    }) => !adornedStart && !focused && !filled && label == null,
    style: theme.vars ? {
      opacity: theme.vars.opacity.inputPlaceholder
    } : {
      opacity: theme.palette.mode === 'light' ? 0.42 : 0.5
    }
  }]
}));
const PickersInputBaseSection = (0, _styles.styled)(_PickersSectionList.Unstable_PickersSectionListSection, {
  name: 'MuiPickersInputBase',
  slot: 'Section',
  overridesResolver: (props, styles) => styles.section
})(({
  theme
}) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: 'inherit',
  letterSpacing: 'inherit',
  lineHeight: '1.4375em',
  // 23px
  display: 'flex'
}));
const PickersInputBaseSectionContent = (0, _styles.styled)(_PickersSectionList.Unstable_PickersSectionListSectionContent, {
  name: 'MuiPickersInputBase',
  slot: 'SectionContent',
  overridesResolver: (props, styles) => styles.content
})(({
  theme
}) => ({
  fontFamily: theme.typography.fontFamily,
  lineHeight: '1.4375em',
  // 23px
  letterSpacing: 'inherit',
  width: 'fit-content',
  outline: 'none'
}));
const PickersInputBaseSectionSeparator = (0, _styles.styled)(_PickersSectionList.Unstable_PickersSectionListSectionSeparator, {
  name: 'MuiPickersInputBase',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator
})(() => ({
  whiteSpace: 'pre',
  letterSpacing: 'inherit'
}));
const PickersInputBaseInput = (0, _styles.styled)('input', {
  name: 'MuiPickersInputBase',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.hiddenInput
})((0, _extends2.default)({}, _visuallyHidden.default));
const useUtilityClasses = ownerState => {
  const {
    focused,
    disabled,
    error,
    classes,
    fullWidth,
    readOnly,
    color,
    size,
    endAdornment,
    startAdornment
  } = ownerState;
  const slots = {
    root: ['root', focused && !disabled && 'focused', disabled && 'disabled', readOnly && 'readOnly', error && 'error', fullWidth && 'fullWidth', `color${(0, _capitalize.default)(color)}`, size === 'small' && 'inputSizeSmall', Boolean(startAdornment) && 'adornedStart', Boolean(endAdornment) && 'adornedEnd'],
    notchedOutline: ['notchedOutline'],
    input: ['input'],
    sectionsContainer: ['sectionsContainer'],
    sectionContent: ['sectionContent'],
    sectionBefore: ['sectionBefore'],
    sectionAfter: ['sectionAfter']
  };
  return (0, _composeClasses.default)(slots, _pickersInputBaseClasses.getPickersInputBaseUtilityClass, classes);
};
/**
 * @ignore - internal component.
 */
const PickersInputBase = exports.PickersInputBase = /*#__PURE__*/React.forwardRef(function PickersInputBase(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersInputBase'
  });
  const {
      elements,
      areAllSectionsEmpty,
      value,
      onChange,
      id,
      endAdornment,
      startAdornment,
      renderSuffix,
      slots,
      slotProps,
      contentEditable,
      tabIndex,
      onInput,
      onPaste,
      onKeyDown,
      name,
      readOnly,
      inputProps,
      inputRef,
      sectionListRef
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rootRef = React.useRef(null);
  const handleRootRef = (0, _useForkRef.default)(ref, rootRef);
  const handleInputRef = (0, _useForkRef.default)(inputProps?.ref, inputRef);
  const muiFormControl = (0, _FormControl.useFormControl)();
  if (!muiFormControl) {
    throw new Error('MUI X: PickersInputBase should always be used inside a PickersTextField component');
  }
  const handleInputFocus = event => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the component is disabled.
    if (muiFormControl.disabled) {
      event.stopPropagation();
      return;
    }
    muiFormControl.onFocus?.(event);
  };
  React.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);
  React.useEffect(() => {
    if (!muiFormControl) {
      return;
    }
    if (areAllSectionsEmpty) {
      muiFormControl.onEmpty();
    } else {
      muiFormControl.onFilled();
    }
  }, [muiFormControl, areAllSectionsEmpty]);
  const ownerState = (0, _extends2.default)({}, props, muiFormControl);
  const classes = useUtilityClasses(ownerState);
  const InputRoot = slots?.root || PickersInputBaseRoot;
  const inputRootProps = (0, _utils2.useSlotProps)({
    elementType: InputRoot,
    externalSlotProps: slotProps?.root,
    externalForwardedProps: other,
    additionalProps: {
      'aria-invalid': muiFormControl.error,
      ref: handleRootRef
    },
    className: classes.root,
    ownerState
  });
  const InputSectionsContainer = slots?.input || PickersInputBaseSectionsContainer;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(InputRoot, (0, _extends2.default)({}, inputRootProps, {
    children: [startAdornment, /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersSectionList.Unstable_PickersSectionList, {
      sectionListRef: sectionListRef,
      elements: elements,
      contentEditable: contentEditable,
      tabIndex: tabIndex,
      className: classes.sectionsContainer,
      onFocus: handleInputFocus,
      onBlur: muiFormControl.onBlur,
      onInput: onInput,
      onPaste: onPaste,
      onKeyDown: onKeyDown,
      slots: {
        root: InputSectionsContainer,
        section: PickersInputBaseSection,
        sectionContent: PickersInputBaseSectionContent,
        sectionSeparator: PickersInputBaseSectionSeparator
      },
      slotProps: {
        root: {
          ownerState
        },
        sectionContent: {
          className: _pickersInputBaseClasses.pickersInputBaseClasses.sectionContent
        },
        sectionSeparator: ({
          position
        }) => ({
          className: position === 'before' ? _pickersInputBaseClasses.pickersInputBaseClasses.sectionBefore : _pickersInputBaseClasses.pickersInputBaseClasses.sectionAfter
        })
      }
    }), endAdornment, renderSuffix ? renderSuffix((0, _extends2.default)({}, muiFormControl)) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersInputBaseInput, (0, _extends2.default)({
      name: name,
      className: classes.input,
      value: value,
      onChange: onChange,
      id: id,
      "aria-hidden": "true",
      tabIndex: -1,
      readOnly: readOnly,
      required: muiFormControl.required,
      disabled: muiFormControl.disabled
    }, inputProps, {
      ref: handleInputRef
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? PickersInputBase.propTypes = {
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