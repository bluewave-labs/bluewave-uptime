'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import AddIcon from '../internal/svg-icons/Add';
import speedDialIconClasses, { getSpeedDialIconUtilityClass } from './speedDialIconClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    open = ownerState.open,
    openIcon = ownerState.openIcon;
  var slots = {
    root: ['root'],
    icon: ['icon', open && 'iconOpen', openIcon && open && 'iconWithOpenIconOpen'],
    openIcon: ['openIcon', open && 'openIconOpen']
  };
  return composeClasses(slots, getSpeedDialIconUtilityClass, classes);
};
var SpeedDialIconRoot = styled('span', {
  name: 'MuiSpeedDialIcon',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [_defineProperty({}, "& .".concat(speedDialIconClasses.icon), styles.icon), _defineProperty({}, "& .".concat(speedDialIconClasses.icon), ownerState.open && styles.iconOpen), _defineProperty({}, "& .".concat(speedDialIconClasses.icon), ownerState.open && ownerState.openIcon && styles.iconWithOpenIconOpen), _defineProperty({}, "& .".concat(speedDialIconClasses.openIcon), styles.openIcon), _defineProperty({}, "& .".concat(speedDialIconClasses.openIcon), ownerState.open && styles.openIconOpen), styles.root];
  }
})(function (_ref6) {
  var theme = _ref6.theme,
    ownerState = _ref6.ownerState;
  return _defineProperty(_defineProperty({
    height: 24
  }, "& .".concat(speedDialIconClasses.icon), _extends({
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    })
  }, ownerState.open && _extends({
    transform: 'rotate(45deg)'
  }, ownerState.openIcon && {
    opacity: 0
  }))), "& .".concat(speedDialIconClasses.openIcon), _extends({
    position: 'absolute',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    transform: 'rotate(-45deg)'
  }, ownerState.open && {
    transform: 'rotate(0deg)',
    opacity: 1
  }));
});
var SpeedDialIcon = /*#__PURE__*/React.forwardRef(function SpeedDialIcon(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSpeedDialIcon'
  });
  var className = props.className,
    iconProp = props.icon,
    open = props.open,
    openIconProp = props.openIcon,
    other = _objectWithoutProperties(props, ["className", "icon", "open", "openIcon"]);
  var ownerState = props;
  var classes = useUtilityClasses(ownerState);
  function formatIcon(icon, newClassName) {
    if ( /*#__PURE__*/React.isValidElement(icon)) {
      return /*#__PURE__*/React.cloneElement(icon, {
        className: newClassName
      });
    }
    return icon;
  }
  return /*#__PURE__*/_jsxs(SpeedDialIconRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: [openIconProp ? formatIcon(openIconProp, classes.openIcon) : null, iconProp ? formatIcon(iconProp, classes.icon) : /*#__PURE__*/_jsx(AddIcon, {
      className: classes.icon
    })]
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDialIcon.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * @ignore
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
SpeedDialIcon.muiName = 'SpeedDialIcon';
export default SpeedDialIcon;