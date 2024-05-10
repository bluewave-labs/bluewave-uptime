'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSlotProps } from '@mui/base/utils';
import composeClasses from '@mui/utils/composeClasses';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useSnackbar } from '@mui/base/useSnackbar';
import styled from '../styles/styled';
import useTheme from '../styles/useTheme';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import Grow from '../Grow';
import SnackbarContent from '../SnackbarContent';
import { getSnackbarUtilityClass } from './snackbarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    anchorOrigin = ownerState.anchorOrigin;
  var slots = {
    root: ['root', "anchorOrigin".concat(capitalize(anchorOrigin.vertical)).concat(capitalize(anchorOrigin.horizontal))]
  };
  return composeClasses(slots, getSnackbarUtilityClass, classes);
};
var SnackbarRoot = styled('div', {
  name: 'MuiSnackbar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles["anchorOrigin".concat(capitalize(ownerState.anchorOrigin.vertical)).concat(capitalize(ownerState.anchorOrigin.horizontal))]];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)'
  };
  return _extends({
    zIndex: (theme.vars || theme).zIndex.snackbar,
    position: 'fixed',
    display: 'flex',
    left: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }, ownerState.anchorOrigin.vertical === 'top' ? {
    top: 8
  } : {
    bottom: 8
  }, ownerState.anchorOrigin.horizontal === 'left' && {
    justifyContent: 'flex-start'
  }, ownerState.anchorOrigin.horizontal === 'right' && {
    justifyContent: 'flex-end'
  }, _defineProperty({}, theme.breakpoints.up('sm'), _extends({}, ownerState.anchorOrigin.vertical === 'top' ? {
    top: 24
  } : {
    bottom: 24
  }, ownerState.anchorOrigin.horizontal === 'center' && center, ownerState.anchorOrigin.horizontal === 'left' && {
    left: 24,
    right: 'auto'
  }, ownerState.anchorOrigin.horizontal === 'right' && {
    right: 24,
    left: 'auto'
  })));
});
var Snackbar = /*#__PURE__*/React.forwardRef(function Snackbar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSnackbar'
  });
  var theme = useTheme();
  var defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  var action = props.action,
    _props$anchorOrigin = props.anchorOrigin,
    _props$anchorOrigin2 = _props$anchorOrigin === void 0 ? {
      vertical: 'bottom',
      horizontal: 'left'
    } : _props$anchorOrigin,
    vertical = _props$anchorOrigin2.vertical,
    horizontal = _props$anchorOrigin2.horizontal,
    _props$autoHideDurati = props.autoHideDuration,
    autoHideDuration = _props$autoHideDurati === void 0 ? null : _props$autoHideDurati,
    children = props.children,
    className = props.className,
    ClickAwayListenerProps = props.ClickAwayListenerProps,
    ContentProps = props.ContentProps,
    _props$disableWindowB = props.disableWindowBlurListener,
    disableWindowBlurListener = _props$disableWindowB === void 0 ? false : _props$disableWindowB,
    message = props.message,
    onBlur = props.onBlur,
    onClose = props.onClose,
    onFocus = props.onFocus,
    onMouseEnter = props.onMouseEnter,
    onMouseLeave = props.onMouseLeave,
    open = props.open,
    resumeHideDuration = props.resumeHideDuration,
    _props$TransitionComp = props.TransitionComponent,
    TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
    _props$transitionDura = props.transitionDuration,
    transitionDuration = _props$transitionDura === void 0 ? defaultTransitionDuration : _props$transitionDura,
    _props$TransitionProp = props.TransitionProps,
    _props$TransitionProp2 = _props$TransitionProp === void 0 ? {} : _props$TransitionProp,
    onEnter = _props$TransitionProp2.onEnter,
    onExited = _props$TransitionProp2.onExited,
    TransitionProps = _objectWithoutProperties(_props$TransitionProp2, ["onEnter", "onExited"]),
    other = _objectWithoutProperties(props, ["action", "anchorOrigin", "autoHideDuration", "children", "className", "ClickAwayListenerProps", "ContentProps", "disableWindowBlurListener", "message", "onBlur", "onClose", "onFocus", "onMouseEnter", "onMouseLeave", "open", "resumeHideDuration", "TransitionComponent", "transitionDuration", "TransitionProps"]);
  var ownerState = _extends({}, props, {
    anchorOrigin: {
      vertical: vertical,
      horizontal: horizontal
    },
    autoHideDuration: autoHideDuration,
    disableWindowBlurListener: disableWindowBlurListener,
    TransitionComponent: TransitionComponent,
    transitionDuration: transitionDuration
  });
  var classes = useUtilityClasses(ownerState);
  var _useSnackbar = useSnackbar(_extends({}, ownerState)),
    getRootProps = _useSnackbar.getRootProps,
    onClickAway = _useSnackbar.onClickAway;
  var _React$useState = React.useState(true),
    exited = _React$useState[0],
    setExited = _React$useState[1];
  var rootProps = useSlotProps({
    elementType: SnackbarRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    ownerState: ownerState,
    additionalProps: {
      ref: ref
    },
    className: [classes.root, className]
  });
  var handleExited = function handleExited(node) {
    setExited(true);
    if (onExited) {
      onExited(node);
    }
  };
  var handleEnter = function handleEnter(node, isAppearing) {
    setExited(false);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  // So we only render active snackbars.
  if (!open && exited) {
    return null;
  }
  return /*#__PURE__*/_jsx(ClickAwayListener, _extends({
    onClickAway: onClickAway
  }, ClickAwayListenerProps, {
    children: /*#__PURE__*/_jsx(SnackbarRoot, _extends({}, rootProps, {
      children: /*#__PURE__*/_jsx(TransitionComponent, _extends({
        appear: true,
        in: open,
        timeout: transitionDuration,
        direction: vertical === 'top' ? 'down' : 'up',
        onEnter: handleEnter,
        onExited: handleExited
      }, TransitionProps, {
        children: children || /*#__PURE__*/_jsx(SnackbarContent, _extends({
          message: message,
          action: action
        }, ContentProps))
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" ? Snackbar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: PropTypes.node,
  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired
  }),
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: PropTypes.number,
  /**
   * Replace the `SnackbarContent` component.
   */
  children: PropTypes.element,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: PropTypes.object,
  /**
   * Props applied to the [`SnackbarContent`](/material-ui/api/snackbar-content/) element.
   */
  ContentProps: PropTypes.object,
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: PropTypes.bool,
  /**
   * When displaying multiple consecutive snackbars using a single parent-rendered
   * `<Snackbar/>`, add the `key` prop to ensure independent treatment of each message.
   * For instance, use `<Snackbar key={message} />`. Otherwise, messages might update
   * in place, and features like `autoHideDuration` could be affected.
   */
  key: function key() {
    return null;
  },
  /**
   * The message to display.
   */
  message: PropTypes.node,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: PropTypes.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: PropTypes.object
} : void 0;
export default Snackbar;