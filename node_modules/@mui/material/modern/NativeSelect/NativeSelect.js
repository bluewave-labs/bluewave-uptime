'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "children", "classes", "IconComponent", "input", "inputProps", "variant"],
  _excluded2 = ["root"];
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import NativeSelectInput from './NativeSelectInput';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Input from '../Input';
import useThemeProps from '../styles/useThemeProps';
import { getNativeSelectUtilityClasses } from './nativeSelectClasses';
import { jsx as _jsx } from "react/jsx-runtime";
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
const defaultInput = /*#__PURE__*/_jsx(Input, {});
/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 */
const NativeSelect = /*#__PURE__*/React.forwardRef(function NativeSelect(inProps, ref) {
  const props = useThemeProps({
    name: 'MuiNativeSelect',
    props: inProps
  });
  const {
      className,
      children,
      classes: classesProp = {},
      IconComponent = ArrowDropDownIcon,
      input = defaultInput,
      inputProps
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant']
  });
  const ownerState = _extends({}, props, {
    classes: classesProp
  });
  const classes = useUtilityClasses(ownerState);
  const otherClasses = _objectWithoutPropertiesLoose(classesProp, _excluded2);
  return /*#__PURE__*/_jsx(React.Fragment, {
    children: /*#__PURE__*/React.cloneElement(input, _extends({
      // Most of the logic is implemented in `NativeSelectInput`.
      // The `Select` component is a simple API wrapper to expose something better to play with.
      inputComponent: NativeSelectInput,
      inputProps: _extends({
        children,
        classes: otherClasses,
        IconComponent,
        variant: fcs.variant,
        type: undefined
      }, inputProps, input ? input.props.inputProps : {}),
      ref
    }, other, {
      className: clsx(classes.root, input.props.className, className)
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
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: PropTypes.elementType,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   * @default <Input />
   */
  input: PropTypes.element,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attributes) applied to the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The `input` value. The DOM API casts this to a string.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
NativeSelect.muiName = 'Select';
export default NativeSelect;