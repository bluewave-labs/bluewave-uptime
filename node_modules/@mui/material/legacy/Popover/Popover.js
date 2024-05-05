'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSlotProps, isHostComponent } from '@mui/base/utils';
import composeClasses from '@mui/utils/composeClasses';
import HTMLElementType from '@mui/utils/HTMLElementType';
import refType from '@mui/utils/refType';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import integerPropType from '@mui/utils/integerPropType';
import chainPropTypes from '@mui/utils/chainPropTypes';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import debounce from '../utils/debounce';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import useForkRef from '../utils/useForkRef';
import Grow from '../Grow';
import Modal from '../Modal';
import PaperBase from '../Paper';
import { getPopoverUtilityClass } from './popoverClasses';
import { jsx as _jsx } from "react/jsx-runtime";
export function getOffsetTop(rect, vertical) {
  var offset = 0;
  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }
  return offset;
}
export function getOffsetLeft(rect, horizontal) {
  var offset = 0;
  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }
  return offset;
}
function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map(function (n) {
    return typeof n === 'number' ? "".concat(n, "px") : n;
  }).join(' ');
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root'],
    paper: ['paper']
  };
  return composeClasses(slots, getPopoverUtilityClass, classes);
};
export var PopoverRoot = styled(Modal, {
  name: 'MuiPopover',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})({});
export var PopoverPaper = styled(PaperBase, {
  name: 'MuiPopover',
  slot: 'Paper',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.paper;
  }
})({
  position: 'absolute',
  overflowY: 'auto',
  overflowX: 'hidden',
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: 'calc(100% - 32px)',
  maxHeight: 'calc(100% - 32px)',
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
var Popover = /*#__PURE__*/React.forwardRef(function Popover(inProps, ref) {
  var _slotProps$paper, _slots$root, _slots$paper;
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPopover'
  });
  var action = props.action,
    anchorEl = props.anchorEl,
    _props$anchorOrigin = props.anchorOrigin,
    anchorOrigin = _props$anchorOrigin === void 0 ? {
      vertical: 'top',
      horizontal: 'left'
    } : _props$anchorOrigin,
    anchorPosition = props.anchorPosition,
    _props$anchorReferenc = props.anchorReference,
    anchorReference = _props$anchorReferenc === void 0 ? 'anchorEl' : _props$anchorReferenc,
    children = props.children,
    className = props.className,
    containerProp = props.container,
    _props$elevation = props.elevation,
    elevation = _props$elevation === void 0 ? 8 : _props$elevation,
    _props$marginThreshol = props.marginThreshold,
    marginThreshold = _props$marginThreshol === void 0 ? 16 : _props$marginThreshol,
    open = props.open,
    _props$PaperProps = props.PaperProps,
    PaperPropsProp = _props$PaperProps === void 0 ? {} : _props$PaperProps,
    slots = props.slots,
    slotProps = props.slotProps,
    _props$transformOrigi = props.transformOrigin,
    transformOrigin = _props$transformOrigi === void 0 ? {
      vertical: 'top',
      horizontal: 'left'
    } : _props$transformOrigi,
    _props$TransitionComp = props.TransitionComponent,
    TransitionComponent = _props$TransitionComp === void 0 ? Grow : _props$TransitionComp,
    _props$transitionDura = props.transitionDuration,
    transitionDurationProp = _props$transitionDura === void 0 ? 'auto' : _props$transitionDura,
    _props$TransitionProp = props.TransitionProps,
    _props$TransitionProp2 = _props$TransitionProp === void 0 ? {} : _props$TransitionProp,
    onEntering = _props$TransitionProp2.onEntering,
    TransitionProps = _objectWithoutProperties(_props$TransitionProp2, ["onEntering"]),
    _props$disableScrollL = props.disableScrollLock,
    disableScrollLock = _props$disableScrollL === void 0 ? false : _props$disableScrollL,
    other = _objectWithoutProperties(props, ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"]);
  var externalPaperSlotProps = (_slotProps$paper = slotProps == null ? void 0 : slotProps.paper) != null ? _slotProps$paper : PaperPropsProp;
  var paperRef = React.useRef();
  var handlePaperRef = useForkRef(paperRef, externalPaperSlotProps.ref);
  var ownerState = _extends({}, props, {
    anchorOrigin: anchorOrigin,
    anchorReference: anchorReference,
    elevation: elevation,
    marginThreshold: marginThreshold,
    externalPaperSlotProps: externalPaperSlotProps,
    transformOrigin: transformOrigin,
    TransitionComponent: TransitionComponent,
    transitionDuration: transitionDurationProp,
    TransitionProps: TransitionProps
  });
  var classes = useUtilityClasses(ownerState);

  // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)
  var getAnchorOffset = React.useCallback(function () {
    if (anchorReference === 'anchorPosition') {
      if (process.env.NODE_ENV !== 'production') {
        if (!anchorPosition) {
          console.error('MUI: You need to provide a `anchorPosition` prop when using ' + '<Popover anchorReference="anchorPosition" />.');
        }
      }
      return anchorPosition;
    }
    var resolvedAnchorEl = resolveAnchorEl(anchorEl);

    // If an anchor element wasn't provided, just use the parent body element of this Popover
    var anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument(paperRef.current).body;
    var anchorRect = anchorElement.getBoundingClientRect();
    if (process.env.NODE_ENV !== 'production') {
      var box = anchorElement.getBoundingClientRect();
      if (process.env.NODE_ENV !== 'test' && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
        console.warn(['MUI: The `anchorEl` prop provided to the component is invalid.', 'The anchor element should be part of the document layout.', "Make sure the element is present in the document or that it's not display none."].join('\n'));
      }
    }
    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]);

  // Returns the base transform origin using the element
  var getTransformOrigin = React.useCallback(function (elemRect) {
    return {
      vertical: getOffsetTop(elemRect, transformOrigin.vertical),
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }, [transformOrigin.horizontal, transformOrigin.vertical]);
  var getPositioningStyle = React.useCallback(function (element) {
    var elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };

    // Get the transform origin point on the element itself
    var elemTransformOrigin = getTransformOrigin(elemRect);
    if (anchorReference === 'none') {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    }

    // Get the offset of the anchoring element
    var anchorOffset = getAnchorOffset();

    // Calculate element positioning
    var top = anchorOffset.top - elemTransformOrigin.vertical;
    var left = anchorOffset.left - elemTransformOrigin.horizontal;
    var bottom = top + elemRect.height;
    var right = left + elemRect.width;

    // Use the parent window of the anchorEl if provided
    var containerWindow = ownerWindow(resolveAnchorEl(anchorEl));

    // Window thresholds taking required margin into account
    var heightThreshold = containerWindow.innerHeight - marginThreshold;
    var widthThreshold = containerWindow.innerWidth - marginThreshold;

    // Check if the vertical axis needs shifting
    if (marginThreshold !== null && top < marginThreshold) {
      var diff = top - marginThreshold;
      top -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (marginThreshold !== null && bottom > heightThreshold) {
      var _diff = bottom - heightThreshold;
      top -= _diff;
      elemTransformOrigin.vertical += _diff;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (elemRect.height > heightThreshold && elemRect.height && heightThreshold) {
        console.error(['MUI: The popover component is too tall.', "Some part of it can not be seen on the screen (".concat(elemRect.height - heightThreshold, "px)."), 'Please consider adding a `max-height` to improve the user-experience.'].join('\n'));
      }
    }

    // Check if the horizontal axis needs shifting
    if (marginThreshold !== null && left < marginThreshold) {
      var _diff2 = left - marginThreshold;
      left -= _diff2;
      elemTransformOrigin.horizontal += _diff2;
    } else if (right > widthThreshold) {
      var _diff3 = right - widthThreshold;
      left -= _diff3;
      elemTransformOrigin.horizontal += _diff3;
    }
    return {
      top: "".concat(Math.round(top), "px"),
      left: "".concat(Math.round(left), "px"),
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }, [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold]);
  var _React$useState = React.useState(open),
    isPositioned = _React$useState[0],
    setIsPositioned = _React$useState[1];
  var setPositioningStyles = React.useCallback(function () {
    var element = paperRef.current;
    if (!element) {
      return;
    }
    var positioning = getPositioningStyle(element);
    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
    setIsPositioned(true);
  }, [getPositioningStyle]);
  React.useEffect(function () {
    if (disableScrollLock) {
      window.addEventListener('scroll', setPositioningStyles);
    }
    return function () {
      return window.removeEventListener('scroll', setPositioningStyles);
    };
  }, [anchorEl, disableScrollLock, setPositioningStyles]);
  var handleEntering = function handleEntering(element, isAppearing) {
    if (onEntering) {
      onEntering(element, isAppearing);
    }
    setPositioningStyles();
  };
  var handleExited = function handleExited() {
    setIsPositioned(false);
  };
  React.useEffect(function () {
    if (open) {
      setPositioningStyles();
    }
  });
  React.useImperativeHandle(action, function () {
    return open ? {
      updatePosition: function updatePosition() {
        setPositioningStyles();
      }
    } : null;
  }, [open, setPositioningStyles]);
  React.useEffect(function () {
    if (!open) {
      return undefined;
    }
    var handleResize = debounce(function () {
      setPositioningStyles();
    });
    var containerWindow = ownerWindow(anchorEl);
    containerWindow.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);
  var transitionDuration = transitionDurationProp;
  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  var container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : undefined);
  var RootSlot = (_slots$root = slots == null ? void 0 : slots.root) != null ? _slots$root : PopoverRoot;
  var PaperSlot = (_slots$paper = slots == null ? void 0 : slots.paper) != null ? _slots$paper : PopoverPaper;
  var paperProps = useSlotProps({
    elementType: PaperSlot,
    externalSlotProps: _extends({}, externalPaperSlotProps, {
      style: isPositioned ? externalPaperSlotProps.style : _extends({}, externalPaperSlotProps.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: elevation,
      ref: handlePaperRef
    },
    ownerState: ownerState,
    className: clsx(classes.paper, externalPaperSlotProps == null ? void 0 : externalPaperSlotProps.className)
  });
  var _useSlotProps = useSlotProps({
      elementType: RootSlot,
      externalSlotProps: (slotProps == null ? void 0 : slotProps.root) || {},
      externalForwardedProps: other,
      additionalProps: {
        ref: ref,
        slotProps: {
          backdrop: {
            invisible: true
          }
        },
        container: container,
        open: open
      },
      ownerState: ownerState,
      className: clsx(classes.root, className)
    }),
    rootSlotPropsProp = _useSlotProps.slotProps,
    rootProps = _objectWithoutProperties(_useSlotProps, ["slotProps"]);
  return /*#__PURE__*/_jsx(RootSlot, _extends({}, rootProps, !isHostComponent(RootSlot) && {
    slotProps: rootSlotPropsProp,
    disableScrollLock: disableScrollLock
  }, {
    children: /*#__PURE__*/_jsx(TransitionComponent, _extends({
      appear: true,
      in: open,
      onEntering: handleEntering,
      onExited: handleExited,
      timeout: transitionDuration
    }, TransitionProps, {
      children: /*#__PURE__*/_jsx(PaperSlot, _extends({}, paperProps, {
        children: children
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" ? Popover.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: refType,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: chainPropTypes(PropTypes.oneOfType([HTMLElementType, PropTypes.func]), function (props) {
    if (props.open && (!props.anchorReference || props.anchorReference === 'anchorEl')) {
      var resolvedAnchorEl = resolveAnchorEl(props.anchorEl);
      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        var box = resolvedAnchorEl.getBoundingClientRect();
        if (process.env.NODE_ENV !== 'test' && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(['MUI: The `anchorEl` prop provided to the component is invalid.', 'The anchor element should be part of the document layout.', "Make sure the element is present in the document or that it's not display none."].join('\n'));
        }
      } else {
        return new Error(['MUI: The `anchorEl` prop provided to the component is invalid.', "It should be an Element or PopoverVirtualElement instance but it's `".concat(resolvedAnchorEl, "` instead.")].join('\n'));
      }
    }
    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([PropTypes.oneOf(['center', 'left', 'right']), PropTypes.number]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(['bottom', 'center', 'top']), PropTypes.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: PropTypes.oneOf(['anchorEl', 'anchorPosition', 'none']),
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
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([HTMLElementType, PropTypes.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: PropTypes.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: integerPropType,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: PropTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    component: elementTypeAcceptingRef
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    paper: PropTypes.elementType,
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([PropTypes.oneOf(['center', 'left', 'right']), PropTypes.number]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(['bottom', 'center', 'top']), PropTypes.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.shape({
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
export default Popover;