'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import FormGroup from '../FormGroup';
import { getRadioGroupUtilityClass } from './radioGroupClasses';
import useForkRef from '../utils/useForkRef';
import useControlled from '../utils/useControlled';
import RadioGroupContext from './RadioGroupContext';
import useId from '../utils/useId';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(props) {
  var classes = props.classes,
    row = props.row,
    error = props.error;
  var slots = {
    root: ['root', row && 'row', error && 'error']
  };
  return composeClasses(slots, getRadioGroupUtilityClass, classes);
};
var RadioGroup = /*#__PURE__*/React.forwardRef(function RadioGroup(props, ref) {
  var actions = props.actions,
    children = props.children,
    className = props.className,
    defaultValue = props.defaultValue,
    nameProp = props.name,
    _onChange = props.onChange,
    valueProp = props.value,
    other = _objectWithoutProperties(props, ["actions", "children", "className", "defaultValue", "name", "onChange", "value"]);
  var rootRef = React.useRef(null);
  var classes = useUtilityClasses(props);
  var _useControlled = useControlled({
      controlled: valueProp,
      default: defaultValue,
      name: 'RadioGroup'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    value = _useControlled2[0],
    setValueState = _useControlled2[1];
  React.useImperativeHandle(actions, function () {
    return {
      focus: function focus() {
        var input = rootRef.current.querySelector('input:not(:disabled):checked');
        if (!input) {
          input = rootRef.current.querySelector('input:not(:disabled)');
        }
        if (input) {
          input.focus();
        }
      }
    };
  }, []);
  var handleRef = useForkRef(ref, rootRef);
  var name = useId(nameProp);
  var contextValue = React.useMemo(function () {
    return {
      name: name,
      onChange: function onChange(event) {
        setValueState(event.target.value);
        if (_onChange) {
          _onChange(event, event.target.value);
        }
      },
      value: value
    };
  }, [name, _onChange, setValueState, value]);
  return /*#__PURE__*/_jsx(RadioGroupContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(FormGroup, _extends({
      role: "radiogroup",
      ref: handleRef,
      className: clsx(classes.root, className)
    }, other, {
      children: children
    }))
  });
});
process.env.NODE_ENV !== "production" ? RadioGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * The name used to reference the value of the control.
   * If you don't provide this prop, it falls back to a randomly generated name.
   */
  name: PropTypes.string,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * @param {string} value The value of the selected radio button.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: PropTypes.any
} : void 0;
export default RadioGroup;