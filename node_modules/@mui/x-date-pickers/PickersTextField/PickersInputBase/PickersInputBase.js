import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["elements", "areAllSectionsEmpty", "defaultValue", "label", "value", "onChange", "id", "autoFocus", "endAdornment", "startAdornment", "renderSuffix", "slots", "slotProps", "contentEditable", "tabIndex", "onInput", "onPaste", "onKeyDown", "fullWidth", "name", "readOnly", "inputProps", "inputRef", "sectionListRef"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { useFormControl } from '@mui/material/FormControl';
import { styled, useThemeProps } from '@mui/material/styles';
import useForkRef from '@mui/utils/useForkRef';
import { refType } from '@mui/utils';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '@mui/utils/capitalize';
import { useSlotProps } from '@mui/base/utils';
import visuallyHidden from '@mui/utils/visuallyHidden';
import { pickersInputBaseClasses, getPickersInputBaseUtilityClass } from './pickersInputBaseClasses';
import { Unstable_PickersSectionList as PickersSectionList, Unstable_PickersSectionListRoot as PickersSectionListRoot, Unstable_PickersSectionListSection as PickersSectionListSection, Unstable_PickersSectionListSectionSeparator as PickersSectionListSectionSeparator, Unstable_PickersSectionListSectionContent as PickersSectionListSectionContent } from '../../PickersSectionList';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const round = value => Math.round(value * 1e5) / 1e5;
export const PickersInputBaseRoot = styled('div', {
  name: 'MuiPickersInputBase',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => _extends({}, theme.typography.body1, {
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
export const PickersInputBaseSectionsContainer = styled(PickersSectionListRoot, {
  name: 'MuiPickersInputBase',
  slot: 'SectionsContainer',
  overridesResolver: (props, styles) => styles.sectionsContainer
})(({
  theme
}) => _extends({
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
const PickersInputBaseSection = styled(PickersSectionListSection, {
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
const PickersInputBaseSectionContent = styled(PickersSectionListSectionContent, {
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
const PickersInputBaseSectionSeparator = styled(PickersSectionListSectionSeparator, {
  name: 'MuiPickersInputBase',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator
})(() => ({
  whiteSpace: 'pre',
  letterSpacing: 'inherit'
}));
const PickersInputBaseInput = styled('input', {
  name: 'MuiPickersInputBase',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.hiddenInput
})(_extends({}, visuallyHidden));
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
    root: ['root', focused && !disabled && 'focused', disabled && 'disabled', readOnly && 'readOnly', error && 'error', fullWidth && 'fullWidth', `color${capitalize(color)}`, size === 'small' && 'inputSizeSmall', Boolean(startAdornment) && 'adornedStart', Boolean(endAdornment) && 'adornedEnd'],
    notchedOutline: ['notchedOutline'],
    input: ['input'],
    sectionsContainer: ['sectionsContainer'],
    sectionContent: ['sectionContent'],
    sectionBefore: ['sectionBefore'],
    sectionAfter: ['sectionAfter']
  };
  return composeClasses(slots, getPickersInputBaseUtilityClass, classes);
};
/**
 * @ignore - internal component.
 */
const PickersInputBase = /*#__PURE__*/React.forwardRef(function PickersInputBase(inProps, ref) {
  const props = useThemeProps({
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
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const rootRef = React.useRef(null);
  const handleRootRef = useForkRef(ref, rootRef);
  const handleInputRef = useForkRef(inputProps?.ref, inputRef);
  const muiFormControl = useFormControl();
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
  const ownerState = _extends({}, props, muiFormControl);
  const classes = useUtilityClasses(ownerState);
  const InputRoot = slots?.root || PickersInputBaseRoot;
  const inputRootProps = useSlotProps({
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
  return /*#__PURE__*/_jsxs(InputRoot, _extends({}, inputRootProps, {
    children: [startAdornment, /*#__PURE__*/_jsx(PickersSectionList, {
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
          className: pickersInputBaseClasses.sectionContent
        },
        sectionSeparator: ({
          position
        }) => ({
          className: position === 'before' ? pickersInputBaseClasses.sectionBefore : pickersInputBaseClasses.sectionAfter
        })
      }
    }), endAdornment, renderSuffix ? renderSuffix(_extends({}, muiFormControl)) : null, /*#__PURE__*/_jsx(PickersInputBaseInput, _extends({
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
  areAllSectionsEmpty: PropTypes.bool.isRequired,
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If true, the whole element is editable.
   * Useful when all the sections are selected.
   */
  contentEditable: PropTypes.bool.isRequired,
  /**
   * The elements to render.
   * Each element contains the prop to edit a section of the value.
   */
  elements: PropTypes.arrayOf(PropTypes.shape({
    after: PropTypes.object.isRequired,
    before: PropTypes.object.isRequired,
    container: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired
  })).isRequired,
  endAdornment: PropTypes.node,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  inputRef: refType,
  label: PropTypes.node,
  margin: PropTypes.oneOf(['dense', 'none', 'normal']),
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
  ownerState: PropTypes.any,
  readOnly: PropTypes.bool,
  renderSuffix: PropTypes.func,
  sectionListRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      getRoot: PropTypes.func.isRequired,
      getSectionContainer: PropTypes.func.isRequired,
      getSectionContent: PropTypes.func.isRequired,
      getSectionIndexFromDOMElement: PropTypes.func.isRequired
    })
  })]),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.object,
  startAdornment: PropTypes.node,
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  value: PropTypes.string.isRequired
} : void 0;
export { PickersInputBase };