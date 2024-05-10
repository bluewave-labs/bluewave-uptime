'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import getValidReactChildren from '@mui/utils/getValidReactChildren';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import toggleButtonGroupClasses, { getToggleButtonGroupUtilityClass } from './toggleButtonGroupClasses';
import ToggleButtonGroupContext from './ToggleButtonGroupContext';
import ToggleButtonGroupButtonContext from './ToggleButtonGroupButtonContext';
import toggleButtonClasses from '../ToggleButton/toggleButtonClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    orientation = ownerState.orientation,
    fullWidth = ownerState.fullWidth,
    disabled = ownerState.disabled;
  var slots = {
    root: ['root', orientation === 'vertical' && 'vertical', fullWidth && 'fullWidth'],
    grouped: ['grouped', "grouped".concat(capitalize(orientation)), disabled && 'disabled'],
    firstButton: ['firstButton'],
    lastButton: ['lastButton'],
    middleButton: ['middleButton']
  };
  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};
var ToggleButtonGroupRoot = styled('div', {
  name: 'MuiToggleButtonGroup',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [_defineProperty({}, "& .".concat(toggleButtonGroupClasses.grouped), styles.grouped), _defineProperty({}, "& .".concat(toggleButtonGroupClasses.grouped), styles["grouped".concat(capitalize(ownerState.orientation))]), _defineProperty({}, "& .".concat(toggleButtonGroupClasses.firstButton), styles.firstButton), _defineProperty({}, "& .".concat(toggleButtonGroupClasses.lastButton), styles.lastButton), _defineProperty({}, "& .".concat(toggleButtonGroupClasses.middleButton), styles.middleButton), styles.root, ownerState.orientation === 'vertical' && styles.vertical, ownerState.fullWidth && styles.fullWidth];
  }
})(function (_ref6) {
  var ownerState = _ref6.ownerState,
    theme = _ref6.theme;
  return _extends({
    display: 'inline-flex',
    borderRadius: (theme.vars || theme).shape.borderRadius
  }, ownerState.orientation === 'vertical' && {
    flexDirection: 'column'
  }, ownerState.fullWidth && {
    width: '100%'
  }, _defineProperty({}, "& .".concat(toggleButtonGroupClasses.grouped), _extends({}, ownerState.orientation === 'horizontal' ? _defineProperty({}, "&.".concat(toggleButtonGroupClasses.selected, " + .").concat(toggleButtonGroupClasses.grouped, ".").concat(toggleButtonGroupClasses.selected), {
    borderLeft: 0,
    marginLeft: 0
  }) : _defineProperty({}, "&.".concat(toggleButtonGroupClasses.selected, " + .").concat(toggleButtonGroupClasses.grouped, ".").concat(toggleButtonGroupClasses.selected), {
    borderTop: 0,
    marginTop: 0
  }))), ownerState.orientation === 'horizontal' ? _defineProperty(_defineProperty({}, "& .".concat(toggleButtonGroupClasses.firstButton, ",& .").concat(toggleButtonGroupClasses.middleButton), {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }), "& .".concat(toggleButtonGroupClasses.lastButton, ",& .").concat(toggleButtonGroupClasses.middleButton), {
    marginLeft: -1,
    borderLeft: '1px solid transparent',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }) : _defineProperty(_defineProperty({}, "& .".concat(toggleButtonGroupClasses.firstButton, ",& .").concat(toggleButtonGroupClasses.middleButton), {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }), "& .".concat(toggleButtonGroupClasses.lastButton, ",& .").concat(toggleButtonGroupClasses.middleButton), {
    marginTop: -1,
    borderTop: '1px solid transparent',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  }), ownerState.orientation === 'horizontal' ? _defineProperty({}, "& .".concat(toggleButtonGroupClasses.lastButton, ".").concat(toggleButtonClasses.disabled, ",& .").concat(toggleButtonGroupClasses.middleButton, ".").concat(toggleButtonClasses.disabled), {
    borderLeft: '1px solid transparent'
  }) : _defineProperty({}, "& .".concat(toggleButtonGroupClasses.lastButton, ".").concat(toggleButtonClasses.disabled, ",& .").concat(toggleButtonGroupClasses.middleButton, ".").concat(toggleButtonClasses.disabled), {
    borderTop: '1px solid transparent'
  }));
});
var ToggleButtonGroup = /*#__PURE__*/React.forwardRef(function ToggleButtonGroup(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiToggleButtonGroup'
  });
  var children = props.children,
    className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? 'standard' : _props$color,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$exclusive = props.exclusive,
    exclusive = _props$exclusive === void 0 ? false : _props$exclusive,
    _props$fullWidth = props.fullWidth,
    fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
    onChange = props.onChange,
    _props$orientation = props.orientation,
    orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
    _props$size = props.size,
    size = _props$size === void 0 ? 'medium' : _props$size,
    value = props.value,
    other = _objectWithoutProperties(props, ["children", "className", "color", "disabled", "exclusive", "fullWidth", "onChange", "orientation", "size", "value"]);
  var ownerState = _extends({}, props, {
    disabled: disabled,
    fullWidth: fullWidth,
    orientation: orientation,
    size: size
  });
  var classes = useUtilityClasses(ownerState);
  var handleChange = React.useCallback(function (event, buttonValue) {
    if (!onChange) {
      return;
    }
    var index = value && value.indexOf(buttonValue);
    var newValue;
    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }
    onChange(event, newValue);
  }, [onChange, value]);
  var handleExclusiveChange = React.useCallback(function (event, buttonValue) {
    if (!onChange) {
      return;
    }
    onChange(event, value === buttonValue ? null : buttonValue);
  }, [onChange, value]);
  var context = React.useMemo(function () {
    return {
      className: classes.grouped,
      onChange: exclusive ? handleExclusiveChange : handleChange,
      value: value,
      size: size,
      fullWidth: fullWidth,
      color: color,
      disabled: disabled
    };
  }, [classes.grouped, exclusive, handleExclusiveChange, handleChange, value, size, fullWidth, color, disabled]);
  var validChildren = getValidReactChildren(children);
  var childrenCount = validChildren.length;
  var getButtonPositionClassName = function getButtonPositionClassName(index) {
    var isFirstButton = index === 0;
    var isLastButton = index === childrenCount - 1;
    if (isFirstButton && isLastButton) {
      return '';
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };
  return /*#__PURE__*/_jsx(ToggleButtonGroupRoot, _extends({
    role: "group",
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: /*#__PURE__*/_jsx(ToggleButtonGroupContext.Provider, {
      value: context,
      children: validChildren.map(function (child, index) {
        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(["MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
          }
        }
        return /*#__PURE__*/_jsx(ToggleButtonGroupButtonContext.Provider, {
          value: getButtonPositionClassName(index),
          children: child
        }, index);
      })
    })
  }));
});
process.env.NODE_ENV !== "production" ? ToggleButtonGroup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the button when it is selected.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * If `true`, the component is disabled. This implies that all ToggleButton children will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive: PropTypes.bool,
  /**
   * If `true`, the button group will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: PropTypes.any
} : void 0;
export default ToggleButtonGroup;