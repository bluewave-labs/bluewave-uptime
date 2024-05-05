'use client';

import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import useTimeout from '@mui/utils/useTimeout';
import clamp from '@mui/utils/clamp';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import Zoom from '../Zoom';
import Fab from '../Fab';
import capitalize from '../utils/capitalize';
import isMuiElement from '../utils/isMuiElement';
import useForkRef from '../utils/useForkRef';
import useControlled from '../utils/useControlled';
import speedDialClasses, { getSpeedDialUtilityClass } from './speedDialClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    open = ownerState.open,
    direction = ownerState.direction;
  var slots = {
    root: ['root', "direction".concat(capitalize(direction))],
    fab: ['fab'],
    actions: ['actions', !open && 'actionsClosed']
  };
  return composeClasses(slots, getSpeedDialUtilityClass, classes);
};
function getOrientation(direction) {
  if (direction === 'up' || direction === 'down') {
    return 'vertical';
  }
  if (direction === 'right' || direction === 'left') {
    return 'horizontal';
  }
  return undefined;
}
var dialRadius = 32;
var spacingActions = 16;
var SpeedDialRoot = styled('div', {
  name: 'MuiSpeedDial',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles["direction".concat(capitalize(ownerState.direction))]];
  }
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({
    zIndex: (theme.vars || theme).zIndex.speedDial,
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none'
  }, ownerState.direction === 'up' && _defineProperty({
    flexDirection: 'column-reverse'
  }, "& .".concat(speedDialClasses.actions), {
    flexDirection: 'column-reverse',
    marginBottom: -dialRadius,
    paddingBottom: spacingActions + dialRadius
  }), ownerState.direction === 'down' && _defineProperty({
    flexDirection: 'column'
  }, "& .".concat(speedDialClasses.actions), {
    flexDirection: 'column',
    marginTop: -dialRadius,
    paddingTop: spacingActions + dialRadius
  }), ownerState.direction === 'left' && _defineProperty({
    flexDirection: 'row-reverse'
  }, "& .".concat(speedDialClasses.actions), {
    flexDirection: 'row-reverse',
    marginRight: -dialRadius,
    paddingRight: spacingActions + dialRadius
  }), ownerState.direction === 'right' && _defineProperty({
    flexDirection: 'row'
  }, "& .".concat(speedDialClasses.actions), {
    flexDirection: 'row',
    marginLeft: -dialRadius,
    paddingLeft: spacingActions + dialRadius
  }));
});
var SpeedDialFab = styled(Fab, {
  name: 'MuiSpeedDial',
  slot: 'Fab',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.fab;
  }
})(function () {
  return {
    pointerEvents: 'auto'
  };
});
var SpeedDialActions = styled('div', {
  name: 'MuiSpeedDial',
  slot: 'Actions',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.actions, !ownerState.open && styles.actionsClosed];
  }
})(function (_ref6) {
  var ownerState = _ref6.ownerState;
  return _extends({
    display: 'flex',
    pointerEvents: 'auto'
  }, !ownerState.open && {
    transition: 'top 0s linear 0.2s',
    pointerEvents: 'none'
  });
});
var SpeedDial = /*#__PURE__*/React.forwardRef(function SpeedDial(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSpeedDial'
  });
  var theme = useTheme();
  var defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  var ariaLabel = props.ariaLabel,
    _props$FabProps = props.FabProps,
    _props$FabProps2 = _props$FabProps === void 0 ? {} : _props$FabProps,
    origDialButtonRef = _props$FabProps2.ref,
    FabProps = _objectWithoutProperties(_props$FabProps2, ["ref"]),
    childrenProp = props.children,
    className = props.className,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? 'up' : _props$direction,
    _props$hidden = props.hidden,
    hidden = _props$hidden === void 0 ? false : _props$hidden,
    icon = props.icon,
    onBlur = props.onBlur,
    onClose = props.onClose,
    onFocus = props.onFocus,
    onKeyDown = props.onKeyDown,
    onMouseEnter = props.onMouseEnter,
    onMouseLeave = props.onMouseLeave,
    onOpen = props.onOpen,
    openProp = props.open,
    openIcon = props.openIcon,
    _props$TransitionComp = props.TransitionComponent,
    TransitionComponent = _props$TransitionComp === void 0 ? Zoom : _props$TransitionComp,
    _props$transitionDura = props.transitionDuration,
    transitionDuration = _props$transitionDura === void 0 ? defaultTransitionDuration : _props$transitionDura,
    TransitionProps = props.TransitionProps,
    other = _objectWithoutProperties(props, ["ariaLabel", "FabProps", "children", "className", "direction", "hidden", "icon", "onBlur", "onClose", "onFocus", "onKeyDown", "onMouseEnter", "onMouseLeave", "onOpen", "open", "openIcon", "TransitionComponent", "transitionDuration", "TransitionProps"]);
  var _useControlled = useControlled({
      controlled: openProp,
      default: false,
      name: 'SpeedDial',
      state: 'open'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    open = _useControlled2[0],
    setOpenState = _useControlled2[1];
  var ownerState = _extends({}, props, {
    open: open,
    direction: direction
  });
  var classes = useUtilityClasses(ownerState);
  var eventTimer = useTimeout();

  /**
   * an index in actions.current
   */
  var focusedAction = React.useRef(0);

  /**
   * pressing this key while the focus is on a child SpeedDialAction focuses
   * the next SpeedDialAction.
   * It is equal to the first arrow key pressed while focus is on the SpeedDial
   * that is not orthogonal to the direction.
   * @type {utils.ArrowKey?}
   */
  var nextItemArrowKey = React.useRef();

  /**
   * refs to the Button that have an action associated to them in this SpeedDial
   * [Fab, ...(SpeedDialActions > Button)]
   * @type {HTMLButtonElement[]}
   */
  var actions = React.useRef([]);
  actions.current = [actions.current[0]];
  var handleOwnFabRef = React.useCallback(function (fabFef) {
    actions.current[0] = fabFef;
  }, []);
  var handleFabRef = useForkRef(origDialButtonRef, handleOwnFabRef);

  /**
   * creates a ref callback for the Button in a SpeedDialAction
   * Is called before the original ref callback for Button that was set in buttonProps
   *
   * @param dialActionIndex {number}
   * @param origButtonRef {React.RefObject?}
   */
  var createHandleSpeedDialActionButtonRef = function createHandleSpeedDialActionButtonRef(dialActionIndex, origButtonRef) {
    return function (buttonRef) {
      actions.current[dialActionIndex + 1] = buttonRef;
      if (origButtonRef) {
        origButtonRef(buttonRef);
      }
    };
  };
  var handleKeyDown = function handleKeyDown(event) {
    if (onKeyDown) {
      onKeyDown(event);
    }
    var key = event.key.replace('Arrow', '').toLowerCase();
    var _nextItemArrowKey$cur = nextItemArrowKey.current,
      nextItemArrowKeyCurrent = _nextItemArrowKey$cur === void 0 ? key : _nextItemArrowKey$cur;
    if (event.key === 'Escape') {
      setOpenState(false);
      actions.current[0].focus();
      if (onClose) {
        onClose(event, 'escapeKeyDown');
      }
      return;
    }
    if (getOrientation(key) === getOrientation(nextItemArrowKeyCurrent) && getOrientation(key) !== undefined) {
      event.preventDefault();
      var actionStep = key === nextItemArrowKeyCurrent ? 1 : -1;

      // stay within array indices
      var nextAction = clamp(focusedAction.current + actionStep, 0, actions.current.length - 1);
      actions.current[nextAction].focus();
      focusedAction.current = nextAction;
      nextItemArrowKey.current = nextItemArrowKeyCurrent;
    }
  };
  React.useEffect(function () {
    // actions were closed while navigation state was not reset
    if (!open) {
      focusedAction.current = 0;
      nextItemArrowKey.current = undefined;
    }
  }, [open]);
  var handleClose = function handleClose(event) {
    if (event.type === 'mouseleave' && onMouseLeave) {
      onMouseLeave(event);
    }
    if (event.type === 'blur' && onBlur) {
      onBlur(event);
    }
    eventTimer.clear();
    if (event.type === 'blur') {
      eventTimer.start(0, function () {
        setOpenState(false);
        if (onClose) {
          onClose(event, 'blur');
        }
      });
    } else {
      setOpenState(false);
      if (onClose) {
        onClose(event, 'mouseLeave');
      }
    }
  };
  var handleClick = function handleClick(event) {
    if (FabProps.onClick) {
      FabProps.onClick(event);
    }
    eventTimer.clear();
    if (open) {
      setOpenState(false);
      if (onClose) {
        onClose(event, 'toggle');
      }
    } else {
      setOpenState(true);
      if (onOpen) {
        onOpen(event, 'toggle');
      }
    }
  };
  var handleOpen = function handleOpen(event) {
    if (event.type === 'mouseenter' && onMouseEnter) {
      onMouseEnter(event);
    }
    if (event.type === 'focus' && onFocus) {
      onFocus(event);
    }

    // When moving the focus between two items,
    // a chain if blur and focus event is triggered.
    // We only handle the last event.
    eventTimer.clear();
    if (!open) {
      // Wait for a future focus or click event
      eventTimer.start(0, function () {
        setOpenState(true);
        if (onOpen) {
          var eventMap = {
            focus: 'focus',
            mouseenter: 'mouseEnter'
          };
          onOpen(event, eventMap[event.type]);
        }
      });
    }
  };

  // Filter the label for valid id characters.
  var id = ariaLabel.replace(/^[^a-z]+|[^\w:.-]+/gi, '');
  var allItems = React.Children.toArray(childrenProp).filter(function (child) {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["MUI: The SpeedDial component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }
    return /*#__PURE__*/React.isValidElement(child);
  });
  var children = allItems.map(function (child, index) {
    var _child$props = child.props,
      _child$props$FabProps = _child$props.FabProps,
      _child$props$FabProps2 = _child$props$FabProps === void 0 ? {} : _child$props$FabProps,
      origButtonRef = _child$props$FabProps2.ref,
      ChildFabProps = _objectWithoutProperties(_child$props$FabProps2, ["ref"]),
      tooltipPlacementProp = _child$props.tooltipPlacement;
    var tooltipPlacement = tooltipPlacementProp || (getOrientation(direction) === 'vertical' ? 'left' : 'top');
    return /*#__PURE__*/React.cloneElement(child, {
      FabProps: _extends({}, ChildFabProps, {
        ref: createHandleSpeedDialActionButtonRef(index, origButtonRef)
      }),
      delay: 30 * (open ? index : allItems.length - index),
      open: open,
      tooltipPlacement: tooltipPlacement,
      id: "".concat(id, "-action-").concat(index)
    });
  });
  return /*#__PURE__*/_jsxs(SpeedDialRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    role: "presentation",
    onKeyDown: handleKeyDown,
    onBlur: handleClose,
    onFocus: handleOpen,
    onMouseEnter: handleOpen,
    onMouseLeave: handleClose,
    ownerState: ownerState
  }, other, {
    children: [/*#__PURE__*/_jsx(TransitionComponent, _extends({
      in: !hidden,
      timeout: transitionDuration,
      unmountOnExit: true
    }, TransitionProps, {
      children: /*#__PURE__*/_jsx(SpeedDialFab, _extends({
        color: "primary",
        "aria-label": ariaLabel,
        "aria-haspopup": "true",
        "aria-expanded": open,
        "aria-controls": "".concat(id, "-actions")
      }, FabProps, {
        onClick: handleClick,
        className: clsx(classes.fab, FabProps.className),
        ref: handleFabRef,
        ownerState: ownerState,
        children: /*#__PURE__*/React.isValidElement(icon) && isMuiElement(icon, ['SpeedDialIcon']) ? /*#__PURE__*/React.cloneElement(icon, {
          open: open
        }) : icon
      }))
    })), /*#__PURE__*/_jsx(SpeedDialActions, {
      id: "".concat(id, "-actions"),
      role: "menu",
      "aria-orientation": getOrientation(direction),
      className: clsx(classes.actions, !open && classes.actionsClosed),
      ownerState: ownerState,
      children: children
    })]
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDial.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The aria-label of the button element.
   * Also used to provide the `id` for the `SpeedDial` element and its children.
   */
  ariaLabel: PropTypes.string.isRequired,
  /**
   * SpeedDialActions to display when the SpeedDial is `open`.
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
   * The direction the actions open relative to the floating action button.
   * @default 'up'
   */
  direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),
  /**
   * Props applied to the [`Fab`](/material-ui/api/fab/) element.
   * @default {}
   */
  FabProps: PropTypes.object,
  /**
   * If `true`, the SpeedDial is hidden.
   * @default false
   */
  hidden: PropTypes.bool,
  /**
   * The icon to display in the SpeedDial Fab. The `SpeedDialIcon` component
   * provides a default Icon with animation.
   */
  icon: PropTypes.node,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"blur"`, `"mouseLeave"`, `"escapeKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggle"`, `"focus"`, `"mouseEnter"`.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The icon to display in the SpeedDial Fab when the SpeedDial is open.
   */
  openIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Zoom
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
   */
  TransitionProps: PropTypes.object
} : void 0;
export default SpeedDial;