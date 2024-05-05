'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import unsupportedProp from '../utils/unsupportedProp';
import bottomNavigationActionClasses, { getBottomNavigationActionUtilityClass } from './bottomNavigationActionClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    showLabel = ownerState.showLabel,
    selected = ownerState.selected;
  var slots = {
    root: ['root', !showLabel && !selected && 'iconOnly', selected && 'selected'],
    label: ['label', !showLabel && !selected && 'iconOnly', selected && 'selected']
  };
  return composeClasses(slots, getBottomNavigationActionUtilityClass, classes);
};
var BottomNavigationActionRoot = styled(ButtonBase, {
  name: 'MuiBottomNavigationAction',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, !ownerState.showLabel && !ownerState.selected && styles.iconOnly];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({
    transition: theme.transitions.create(['color', 'padding-top'], {
      duration: theme.transitions.duration.short
    }),
    padding: '0px 12px',
    minWidth: 80,
    maxWidth: 168,
    color: (theme.vars || theme).palette.text.secondary,
    flexDirection: 'column',
    flex: '1'
  }, !ownerState.showLabel && !ownerState.selected && {
    paddingTop: 14
  }, !ownerState.showLabel && !ownerState.selected && !ownerState.label && {
    paddingTop: 0
  }, _defineProperty({}, "&.".concat(bottomNavigationActionClasses.selected), {
    color: (theme.vars || theme).palette.primary.main
  }));
});
var BottomNavigationActionLabel = styled('span', {
  name: 'MuiBottomNavigationAction',
  slot: 'Label',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.label;
  }
})(function (_ref2) {
  var theme = _ref2.theme,
    ownerState = _ref2.ownerState;
  return _extends({
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    opacity: 1,
    transition: 'font-size 0.2s, opacity 0.2s',
    transitionDelay: '0.1s'
  }, !ownerState.showLabel && !ownerState.selected && {
    opacity: 0,
    transitionDelay: '0s'
  }, _defineProperty({}, "&.".concat(bottomNavigationActionClasses.selected), {
    fontSize: theme.typography.pxToRem(14)
  }));
});
var BottomNavigationAction = /*#__PURE__*/React.forwardRef(function BottomNavigationAction(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiBottomNavigationAction'
  });
  var className = props.className,
    icon = props.icon,
    label = props.label,
    onChange = props.onChange,
    onClick = props.onClick,
    selected = props.selected,
    showLabel = props.showLabel,
    value = props.value,
    other = _objectWithoutProperties(props, ["className", "icon", "label", "onChange", "onClick", "selected", "showLabel", "value"]);
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  var handleChange = function handleChange(event) {
    if (onChange) {
      onChange(event, value);
    }
    if (onClick) {
      onClick(event);
    }
  };
  return /*#__PURE__*/_jsxs(BottomNavigationActionRoot, _extends({
    ref: ref,
    className: clsx(classes.root, className),
    focusRipple: true,
    onClick: handleChange,
    ownerState: ownerState
  }, other, {
    children: [icon, /*#__PURE__*/_jsx(BottomNavigationActionLabel, {
      className: classes.label,
      ownerState: ownerState,
      children: label
    })]
  }));
});
process.env.NODE_ENV !== "production" ? BottomNavigationAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display.
   */
  icon: PropTypes.node,
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any
} : void 0;
export default BottomNavigationAction;