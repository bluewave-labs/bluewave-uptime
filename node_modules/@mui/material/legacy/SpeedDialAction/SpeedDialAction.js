'use client';

// @inheritedComponent Tooltip
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { emphasize } from '@mui/system/colorManipulator';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Fab from '../Fab';
import Tooltip from '../Tooltip';
import capitalize from '../utils/capitalize';
import speedDialActionClasses, { getSpeedDialActionUtilityClass } from './speedDialActionClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var open = ownerState.open,
    tooltipPlacement = ownerState.tooltipPlacement,
    classes = ownerState.classes;
  var slots = {
    fab: ['fab', !open && 'fabClosed'],
    staticTooltip: ['staticTooltip', "tooltipPlacement".concat(capitalize(tooltipPlacement)), !open && 'staticTooltipClosed'],
    staticTooltipLabel: ['staticTooltipLabel']
  };
  return composeClasses(slots, getSpeedDialActionUtilityClass, classes);
};
var SpeedDialActionFab = styled(Fab, {
  name: 'MuiSpeedDialAction',
  slot: 'Fab',
  skipVariantsResolver: false,
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.fab, !ownerState.open && styles.fabClosed];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({
    margin: 8,
    color: (theme.vars || theme).palette.text.secondary,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
      backgroundColor: theme.vars ? theme.vars.palette.SpeedDialAction.fabHoverBg : emphasize(theme.palette.background.paper, 0.15)
    },
    transition: "".concat(theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter
    }), ", opacity 0.8s"),
    opacity: 1
  }, !ownerState.open && {
    opacity: 0,
    transform: 'scale(0)'
  });
});
var SpeedDialActionStaticTooltip = styled('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltip',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.staticTooltip, !ownerState.open && styles.staticTooltipClosed, styles["tooltipPlacement".concat(capitalize(ownerState.tooltipPlacement))]];
  }
})(function (_ref2) {
  var theme = _ref2.theme,
    ownerState = _ref2.ownerState;
  return _defineProperty({
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  }, "& .".concat(speedDialActionClasses.staticTooltipLabel), _extends({
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.shorter
    }),
    opacity: 1
  }, !ownerState.open && {
    opacity: 0,
    transform: 'scale(0.5)'
  }, ownerState.tooltipPlacement === 'left' && {
    transformOrigin: '100% 50%',
    right: '100%',
    marginRight: 8
  }, ownerState.tooltipPlacement === 'right' && {
    transformOrigin: '0% 50%',
    left: '100%',
    marginLeft: 8
  }));
});
var SpeedDialActionStaticTooltipLabel = styled('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltipLabel',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.staticTooltipLabel;
  }
})(function (_ref4) {
  var theme = _ref4.theme;
  return _extends({
    position: 'absolute'
  }, theme.typography.body1, {
    backgroundColor: (theme.vars || theme).palette.background.paper,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    boxShadow: (theme.vars || theme).shadows[1],
    color: (theme.vars || theme).palette.text.secondary,
    padding: '4px 16px',
    wordBreak: 'keep-all'
  });
});
var SpeedDialAction = /*#__PURE__*/React.forwardRef(function SpeedDialAction(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSpeedDialAction'
  });
  var className = props.className,
    _props$delay = props.delay,
    delay = _props$delay === void 0 ? 0 : _props$delay,
    _props$FabProps = props.FabProps,
    FabProps = _props$FabProps === void 0 ? {} : _props$FabProps,
    icon = props.icon,
    id = props.id,
    open = props.open,
    TooltipClasses = props.TooltipClasses,
    _props$tooltipOpen = props.tooltipOpen,
    tooltipOpenProp = _props$tooltipOpen === void 0 ? false : _props$tooltipOpen,
    _props$tooltipPlaceme = props.tooltipPlacement,
    tooltipPlacement = _props$tooltipPlaceme === void 0 ? 'left' : _props$tooltipPlaceme,
    tooltipTitle = props.tooltipTitle,
    other = _objectWithoutProperties(props, ["className", "delay", "FabProps", "icon", "id", "open", "TooltipClasses", "tooltipOpen", "tooltipPlacement", "tooltipTitle"]);
  var ownerState = _extends({}, props, {
    tooltipPlacement: tooltipPlacement
  });
  var classes = useUtilityClasses(ownerState);
  var _React$useState = React.useState(tooltipOpenProp),
    tooltipOpen = _React$useState[0],
    setTooltipOpen = _React$useState[1];
  var handleTooltipClose = function handleTooltipClose() {
    setTooltipOpen(false);
  };
  var handleTooltipOpen = function handleTooltipOpen() {
    setTooltipOpen(true);
  };
  var transitionStyle = {
    transitionDelay: "".concat(delay, "ms")
  };
  var fab = /*#__PURE__*/_jsx(SpeedDialActionFab, _extends({
    size: "small",
    className: clsx(classes.fab, className),
    tabIndex: -1,
    role: "menuitem",
    ownerState: ownerState
  }, FabProps, {
    style: _extends({}, transitionStyle, FabProps.style),
    children: icon
  }));
  if (tooltipOpenProp) {
    return /*#__PURE__*/_jsxs(SpeedDialActionStaticTooltip, _extends({
      id: id,
      ref: ref,
      className: classes.staticTooltip,
      ownerState: ownerState
    }, other, {
      children: [/*#__PURE__*/_jsx(SpeedDialActionStaticTooltipLabel, {
        style: transitionStyle,
        id: "".concat(id, "-label"),
        className: classes.staticTooltipLabel,
        ownerState: ownerState,
        children: tooltipTitle
      }), /*#__PURE__*/React.cloneElement(fab, {
        'aria-labelledby': "".concat(id, "-label")
      })]
    }));
  }
  if (!open && tooltipOpen) {
    setTooltipOpen(false);
  }
  return /*#__PURE__*/_jsx(Tooltip, _extends({
    id: id,
    ref: ref,
    title: tooltipTitle,
    placement: tooltipPlacement,
    onClose: handleTooltipClose,
    onOpen: handleTooltipOpen,
    open: open && tooltipOpen,
    classes: TooltipClasses
  }, other, {
    children: fab
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDialAction.propTypes /* remove-proptypes */ = {
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
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay: PropTypes.number,
  /**
   * Props applied to the [`Fab`](/material-ui/api/fab/) component.
   * @default {}
   */
  FabProps: PropTypes.object,
  /**
   * The icon to display in the SpeedDial Fab.
   */
  icon: PropTypes.node,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * `classes` prop applied to the [`Tooltip`](/material-ui/api/tooltip/) element.
   */
  TooltipClasses: PropTypes.object,
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   * @default false
   */
  tooltipOpen: PropTypes.bool,
  /**
   * Placement of the tooltip.
   * @default 'left'
   */
  tooltipPlacement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: PropTypes.node
} : void 0;
export default SpeedDialAction;