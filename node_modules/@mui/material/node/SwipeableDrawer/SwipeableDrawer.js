"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.reset = reset;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _elementTypeAcceptingRef = _interopRequireDefault(require("@mui/utils/elementTypeAcceptingRef"));
var _useThemeProps = _interopRequireDefault(require("@mui/system/useThemeProps"));
var _base = require("@mui/base");
var _Drawer = _interopRequireWildcard(require("../Drawer/Drawer"));
var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));
var _ownerDocument = _interopRequireDefault(require("../utils/ownerDocument"));
var _ownerWindow = _interopRequireDefault(require("../utils/ownerWindow"));
var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));
var _useEnhancedEffect = _interopRequireDefault(require("../utils/useEnhancedEffect"));
var _useTheme = _interopRequireDefault(require("../styles/useTheme"));
var _utils = require("../transitions/utils");
var _SwipeArea = _interopRequireDefault(require("./SwipeArea"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["BackdropProps"],
  _excluded2 = ["anchor", "disableBackdropTransition", "disableDiscovery", "disableSwipeToOpen", "hideBackdrop", "hysteresis", "allowSwipeInChildren", "minFlingVelocity", "ModalProps", "onClose", "onOpen", "open", "PaperProps", "SwipeAreaProps", "swipeAreaWidth", "transitionDuration", "variant"]; // This value is closed to what browsers are using internally to
// trigger a native scroll.
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UNCERTAINTY_THRESHOLD = 3; // px

// This is the part of the drawer displayed on touch start.
const DRAG_STARTED_SIGNAL = 20; // px

// We can only have one instance at the time claiming ownership for handling the swipe.
// Otherwise, the UX would be confusing.
// That's why we use a singleton here.
let claimedSwipeInstance = null;

// Exported for test purposes.
function reset() {
  claimedSwipeInstance = null;
}
function calculateCurrentX(anchor, touches, doc) {
  return anchor === 'right' ? doc.body.offsetWidth - touches[0].pageX : touches[0].pageX;
}
function calculateCurrentY(anchor, touches, containerWindow) {
  return anchor === 'bottom' ? containerWindow.innerHeight - touches[0].clientY : touches[0].clientY;
}
function getMaxTranslate(horizontalSwipe, paperInstance) {
  return horizontalSwipe ? paperInstance.clientWidth : paperInstance.clientHeight;
}
function getTranslate(currentTranslate, startLocation, open, maxTranslate) {
  return Math.min(Math.max(open ? startLocation - currentTranslate : maxTranslate + startLocation - currentTranslate, 0), maxTranslate);
}

/**
 * @param {Element | null} element
 * @param {Element} rootNode
 */
function getDomTreeShapes(element, rootNode) {
  // Adapted from https://github.com/oliviertassinari/react-swipeable-views/blob/7666de1dba253b896911adf2790ce51467670856/packages/react-swipeable-views/src/SwipeableViews.js#L129
  const domTreeShapes = [];
  while (element && element !== rootNode.parentElement) {
    const style = (0, _ownerWindow.default)(rootNode).getComputedStyle(element);
    if (
    // Ignore the scroll children if the element is absolute positioned.
    style.getPropertyValue('position') === 'absolute' ||
    // Ignore the scroll children if the element has an overflowX hidden
    style.getPropertyValue('overflow-x') === 'hidden') {
      // noop
    } else if (element.clientWidth > 0 && element.scrollWidth > element.clientWidth || element.clientHeight > 0 && element.scrollHeight > element.clientHeight) {
      // Ignore the nodes that have no width.
      // Keep elements with a scroll
      domTreeShapes.push(element);
    }
    element = element.parentElement;
  }
  return domTreeShapes;
}

/**
 * @param {object} param0
 * @param {ReturnType<getDomTreeShapes>} param0.domTreeShapes
 */
function computeHasNativeHandler({
  domTreeShapes,
  start,
  current,
  anchor
}) {
  // Adapted from https://github.com/oliviertassinari/react-swipeable-views/blob/7666de1dba253b896911adf2790ce51467670856/packages/react-swipeable-views/src/SwipeableViews.js#L175
  const axisProperties = {
    scrollPosition: {
      x: 'scrollLeft',
      y: 'scrollTop'
    },
    scrollLength: {
      x: 'scrollWidth',
      y: 'scrollHeight'
    },
    clientLength: {
      x: 'clientWidth',
      y: 'clientHeight'
    }
  };
  return domTreeShapes.some(shape => {
    // Determine if we are going backward or forward.
    let goingForward = current >= start;
    if (anchor === 'top' || anchor === 'left') {
      goingForward = !goingForward;
    }
    const axis = anchor === 'left' || anchor === 'right' ? 'x' : 'y';
    const scrollPosition = Math.round(shape[axisProperties.scrollPosition[axis]]);
    const areNotAtStart = scrollPosition > 0;
    const areNotAtEnd = scrollPosition + shape[axisProperties.clientLength[axis]] < shape[axisProperties.scrollLength[axis]];
    if (goingForward && areNotAtEnd || !goingForward && areNotAtStart) {
      return true;
    }
    return false;
  });
}
const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
const SwipeableDrawer = /*#__PURE__*/React.forwardRef(function SwipeableDrawer(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    name: 'MuiSwipeableDrawer',
    props: inProps
  });
  const theme = (0, _useTheme.default)();
  const transitionDurationDefault = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
      anchor = 'left',
      disableBackdropTransition = false,
      disableDiscovery = false,
      disableSwipeToOpen = iOS,
      hideBackdrop,
      hysteresis = 0.52,
      allowSwipeInChildren = false,
      minFlingVelocity = 450,
      ModalProps: {
        BackdropProps
      } = {},
      onClose,
      onOpen,
      open = false,
      PaperProps = {},
      SwipeAreaProps,
      swipeAreaWidth = 20,
      transitionDuration = transitionDurationDefault,
      variant = 'temporary' // Mobile first.
    } = props,
    ModalPropsProp = (0, _objectWithoutPropertiesLoose2.default)(props.ModalProps, _excluded),
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
  const [maybeSwiping, setMaybeSwiping] = React.useState(false);
  const swipeInstance = React.useRef({
    isSwiping: null
  });
  const swipeAreaRef = React.useRef();
  const backdropRef = React.useRef();
  const paperRef = React.useRef();
  const handleRef = (0, _useForkRef.default)(PaperProps.ref, paperRef);
  const touchDetected = React.useRef(false);

  // Ref for transition duration based on / to match swipe speed
  const calculatedDurationRef = React.useRef();

  // Use a ref so the open value used is always up to date inside useCallback.
  (0, _useEnhancedEffect.default)(() => {
    calculatedDurationRef.current = null;
  }, [open]);
  const setPosition = React.useCallback((translate, options = {}) => {
    const {
      mode = null,
      changeTransition = true
    } = options;
    const anchorRtl = (0, _Drawer.getAnchor)(theme, anchor);
    const rtlTranslateMultiplier = ['right', 'bottom'].indexOf(anchorRtl) !== -1 ? 1 : -1;
    const horizontalSwipe = (0, _Drawer.isHorizontal)(anchor);
    const transform = horizontalSwipe ? `translate(${rtlTranslateMultiplier * translate}px, 0)` : `translate(0, ${rtlTranslateMultiplier * translate}px)`;
    const drawerStyle = paperRef.current.style;
    drawerStyle.webkitTransform = transform;
    drawerStyle.transform = transform;
    let transition = '';
    if (mode) {
      transition = theme.transitions.create('all', (0, _utils.getTransitionProps)({
        easing: undefined,
        style: undefined,
        timeout: transitionDuration
      }, {
        mode
      }));
    }
    if (changeTransition) {
      drawerStyle.webkitTransition = transition;
      drawerStyle.transition = transition;
    }
    if (!disableBackdropTransition && !hideBackdrop) {
      const backdropStyle = backdropRef.current.style;
      backdropStyle.opacity = 1 - translate / getMaxTranslate(horizontalSwipe, paperRef.current);
      if (changeTransition) {
        backdropStyle.webkitTransition = transition;
        backdropStyle.transition = transition;
      }
    }
  }, [anchor, disableBackdropTransition, hideBackdrop, theme, transitionDuration]);
  const handleBodyTouchEnd = (0, _useEventCallback.default)(nativeEvent => {
    if (!touchDetected.current) {
      return;
    }
    claimedSwipeInstance = null;
    touchDetected.current = false;
    ReactDOM.flushSync(() => {
      setMaybeSwiping(false);
    });

    // The swipe wasn't started.
    if (!swipeInstance.current.isSwiping) {
      swipeInstance.current.isSwiping = null;
      return;
    }
    swipeInstance.current.isSwiping = null;
    const anchorRtl = (0, _Drawer.getAnchor)(theme, anchor);
    const horizontal = (0, _Drawer.isHorizontal)(anchor);
    let current;
    if (horizontal) {
      current = calculateCurrentX(anchorRtl, nativeEvent.changedTouches, (0, _ownerDocument.default)(nativeEvent.currentTarget));
    } else {
      current = calculateCurrentY(anchorRtl, nativeEvent.changedTouches, (0, _ownerWindow.default)(nativeEvent.currentTarget));
    }
    const startLocation = horizontal ? swipeInstance.current.startX : swipeInstance.current.startY;
    const maxTranslate = getMaxTranslate(horizontal, paperRef.current);
    const currentTranslate = getTranslate(current, startLocation, open, maxTranslate);
    const translateRatio = currentTranslate / maxTranslate;
    if (Math.abs(swipeInstance.current.velocity) > minFlingVelocity) {
      // Calculate transition duration to match swipe speed
      calculatedDurationRef.current = Math.abs((maxTranslate - currentTranslate) / swipeInstance.current.velocity) * 1000;
    }
    if (open) {
      if (swipeInstance.current.velocity > minFlingVelocity || translateRatio > hysteresis) {
        onClose();
      } else {
        // Reset the position, the swipe was aborted.
        setPosition(0, {
          mode: 'exit'
        });
      }
      return;
    }
    if (swipeInstance.current.velocity < -minFlingVelocity || 1 - translateRatio > hysteresis) {
      onOpen();
    } else {
      // Reset the position, the swipe was aborted.
      setPosition(getMaxTranslate(horizontal, paperRef.current), {
        mode: 'enter'
      });
    }
  });
  const startMaybeSwiping = (force = false) => {
    if (!maybeSwiping) {
      // on Safari Mobile, if you want to be able to have the 'click' event fired on child elements, nothing in the DOM can be changed.
      // this is because Safari Mobile will not fire any mouse events (still fires touch though) if the DOM changes during mousemove.
      // so do this change on first touchmove instead of touchstart
      if (force || !(disableDiscovery && allowSwipeInChildren)) {
        ReactDOM.flushSync(() => {
          setMaybeSwiping(true);
        });
      }
      const horizontalSwipe = (0, _Drawer.isHorizontal)(anchor);
      if (!open && paperRef.current) {
        // The ref may be null when a parent component updates while swiping.
        setPosition(getMaxTranslate(horizontalSwipe, paperRef.current) + (disableDiscovery ? 15 : -DRAG_STARTED_SIGNAL), {
          changeTransition: false
        });
      }
      swipeInstance.current.velocity = 0;
      swipeInstance.current.lastTime = null;
      swipeInstance.current.lastTranslate = null;
      swipeInstance.current.paperHit = false;
      touchDetected.current = true;
    }
  };
  const handleBodyTouchMove = (0, _useEventCallback.default)(nativeEvent => {
    // the ref may be null when a parent component updates while swiping
    if (!paperRef.current || !touchDetected.current) {
      return;
    }

    // We are not supposed to handle this touch move because the swipe was started in a scrollable container in the drawer
    if (claimedSwipeInstance !== null && claimedSwipeInstance !== swipeInstance.current) {
      return;
    }
    startMaybeSwiping(true);
    const anchorRtl = (0, _Drawer.getAnchor)(theme, anchor);
    const horizontalSwipe = (0, _Drawer.isHorizontal)(anchor);
    const currentX = calculateCurrentX(anchorRtl, nativeEvent.touches, (0, _ownerDocument.default)(nativeEvent.currentTarget));
    const currentY = calculateCurrentY(anchorRtl, nativeEvent.touches, (0, _ownerWindow.default)(nativeEvent.currentTarget));
    if (open && paperRef.current.contains(nativeEvent.target) && claimedSwipeInstance === null) {
      const domTreeShapes = getDomTreeShapes(nativeEvent.target, paperRef.current);
      const hasNativeHandler = computeHasNativeHandler({
        domTreeShapes,
        start: horizontalSwipe ? swipeInstance.current.startX : swipeInstance.current.startY,
        current: horizontalSwipe ? currentX : currentY,
        anchor
      });
      if (hasNativeHandler) {
        claimedSwipeInstance = true;
        return;
      }
      claimedSwipeInstance = swipeInstance.current;
    }

    // We don't know yet.
    if (swipeInstance.current.isSwiping == null) {
      const dx = Math.abs(currentX - swipeInstance.current.startX);
      const dy = Math.abs(currentY - swipeInstance.current.startY);
      const definitelySwiping = horizontalSwipe ? dx > dy && dx > UNCERTAINTY_THRESHOLD : dy > dx && dy > UNCERTAINTY_THRESHOLD;
      if (definitelySwiping && nativeEvent.cancelable) {
        nativeEvent.preventDefault();
      }
      if (definitelySwiping === true || (horizontalSwipe ? dy > UNCERTAINTY_THRESHOLD : dx > UNCERTAINTY_THRESHOLD)) {
        swipeInstance.current.isSwiping = definitelySwiping;
        if (!definitelySwiping) {
          handleBodyTouchEnd(nativeEvent);
          return;
        }

        // Shift the starting point.
        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY;

        // Compensate for the part of the drawer displayed on touch start.
        if (!disableDiscovery && !open) {
          if (horizontalSwipe) {
            swipeInstance.current.startX -= DRAG_STARTED_SIGNAL;
          } else {
            swipeInstance.current.startY -= DRAG_STARTED_SIGNAL;
          }
        }
      }
    }
    if (!swipeInstance.current.isSwiping) {
      return;
    }
    const maxTranslate = getMaxTranslate(horizontalSwipe, paperRef.current);
    let startLocation = horizontalSwipe ? swipeInstance.current.startX : swipeInstance.current.startY;
    if (open && !swipeInstance.current.paperHit) {
      startLocation = Math.min(startLocation, maxTranslate);
    }
    const translate = getTranslate(horizontalSwipe ? currentX : currentY, startLocation, open, maxTranslate);
    if (open) {
      if (!swipeInstance.current.paperHit) {
        const paperHit = horizontalSwipe ? currentX < maxTranslate : currentY < maxTranslate;
        if (paperHit) {
          swipeInstance.current.paperHit = true;
          swipeInstance.current.startX = currentX;
          swipeInstance.current.startY = currentY;
        } else {
          return;
        }
      } else if (translate === 0) {
        swipeInstance.current.startX = currentX;
        swipeInstance.current.startY = currentY;
      }
    }
    if (swipeInstance.current.lastTranslate === null) {
      swipeInstance.current.lastTranslate = translate;
      swipeInstance.current.lastTime = performance.now() + 1;
    }
    const velocity = (translate - swipeInstance.current.lastTranslate) / (performance.now() - swipeInstance.current.lastTime) * 1e3;

    // Low Pass filter.
    swipeInstance.current.velocity = swipeInstance.current.velocity * 0.4 + velocity * 0.6;
    swipeInstance.current.lastTranslate = translate;
    swipeInstance.current.lastTime = performance.now();

    // We are swiping, let's prevent the scroll event on iOS.
    if (nativeEvent.cancelable) {
      nativeEvent.preventDefault();
    }
    setPosition(translate);
  });
  const handleBodyTouchStart = (0, _useEventCallback.default)(nativeEvent => {
    // We are not supposed to handle this touch move.
    // Example of use case: ignore the event if there is a Slider.
    if (nativeEvent.defaultPrevented) {
      return;
    }

    // We can only have one node at the time claiming ownership for handling the swipe.
    if (nativeEvent.defaultMuiPrevented) {
      return;
    }

    // At least one element clogs the drawer interaction zone.
    if (open && (hideBackdrop || !backdropRef.current.contains(nativeEvent.target)) && !paperRef.current.contains(nativeEvent.target)) {
      return;
    }
    const anchorRtl = (0, _Drawer.getAnchor)(theme, anchor);
    const horizontalSwipe = (0, _Drawer.isHorizontal)(anchor);
    const currentX = calculateCurrentX(anchorRtl, nativeEvent.touches, (0, _ownerDocument.default)(nativeEvent.currentTarget));
    const currentY = calculateCurrentY(anchorRtl, nativeEvent.touches, (0, _ownerWindow.default)(nativeEvent.currentTarget));
    if (!open) {
      var _paperRef$current;
      // logic for if swipe should be ignored:
      // if disableSwipeToOpen
      // if target != swipeArea, and target is not a child of paper ref
      // if is a child of paper ref, and `allowSwipeInChildren` does not allow it
      if (disableSwipeToOpen || !(nativeEvent.target === swipeAreaRef.current || (_paperRef$current = paperRef.current) != null && _paperRef$current.contains(nativeEvent.target) && (typeof allowSwipeInChildren === 'function' ? allowSwipeInChildren(nativeEvent, swipeAreaRef.current, paperRef.current) : allowSwipeInChildren))) {
        return;
      }
      if (horizontalSwipe) {
        if (currentX > swipeAreaWidth) {
          return;
        }
      } else if (currentY > swipeAreaWidth) {
        return;
      }
    }
    nativeEvent.defaultMuiPrevented = true;
    claimedSwipeInstance = null;
    swipeInstance.current.startX = currentX;
    swipeInstance.current.startY = currentY;
    startMaybeSwiping();
  });
  React.useEffect(() => {
    if (variant === 'temporary') {
      const doc = (0, _ownerDocument.default)(paperRef.current);
      doc.addEventListener('touchstart', handleBodyTouchStart);
      // A blocking listener prevents Firefox's navbar to auto-hide on scroll.
      // It only needs to prevent scrolling on the drawer's content when open.
      // When closed, the overlay prevents scrolling.
      doc.addEventListener('touchmove', handleBodyTouchMove, {
        passive: !open
      });
      doc.addEventListener('touchend', handleBodyTouchEnd);
      return () => {
        doc.removeEventListener('touchstart', handleBodyTouchStart);
        doc.removeEventListener('touchmove', handleBodyTouchMove, {
          passive: !open
        });
        doc.removeEventListener('touchend', handleBodyTouchEnd);
      };
    }
    return undefined;
  }, [variant, open, handleBodyTouchStart, handleBodyTouchMove, handleBodyTouchEnd]);
  React.useEffect(() => () => {
    // We need to release the lock.
    if (claimedSwipeInstance === swipeInstance.current) {
      claimedSwipeInstance = null;
    }
  }, []);
  React.useEffect(() => {
    if (!open) {
      setMaybeSwiping(false);
    }
  }, [open]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Drawer.default, (0, _extends2.default)({
      open: variant === 'temporary' && maybeSwiping ? true : open,
      variant: variant,
      ModalProps: (0, _extends2.default)({
        BackdropProps: (0, _extends2.default)({}, BackdropProps, {
          ref: backdropRef
        })
      }, variant === 'temporary' && {
        keepMounted: true
      }, ModalPropsProp),
      hideBackdrop: hideBackdrop,
      PaperProps: (0, _extends2.default)({}, PaperProps, {
        style: (0, _extends2.default)({
          pointerEvents: variant === 'temporary' && !open && !allowSwipeInChildren ? 'none' : ''
        }, PaperProps.style),
        ref: handleRef
      }),
      anchor: anchor,
      transitionDuration: calculatedDurationRef.current || transitionDuration,
      onClose: onClose,
      ref: ref
    }, other)), !disableSwipeToOpen && variant === 'temporary' && /*#__PURE__*/(0, _jsxRuntime.jsx)(_base.NoSsr, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SwipeArea.default, (0, _extends2.default)({
        anchor: anchor,
        ref: swipeAreaRef,
        width: swipeAreaWidth
      }, SwipeAreaProps))
    })]
  });
});
process.env.NODE_ENV !== "production" ? SwipeableDrawer.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If set to true, the swipe event will open the drawer even if the user begins the swipe on one of the drawer's children.
   * This can be useful in scenarios where the drawer is partially visible.
   * You can customize it further with a callback that determines which children the user can drag over to open the drawer
   * (for example, to ignore other elements that handle touch move events, like sliders).
   *
   * @param {TouchEvent} event The 'touchstart' event
   * @param {HTMLDivElement} swipeArea The swipe area element
   * @param {HTMLDivElement} paper The drawer's paper element
   *
   * @default false
   */
  allowSwipeInChildren: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.bool]),
  /**
   * @ignore
   */
  anchor: _propTypes.default.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,
  /**
   * Disable the backdrop transition.
   * This can improve the FPS on low-end devices.
   * @default false
   */
  disableBackdropTransition: _propTypes.default.bool,
  /**
   * If `true`, touching the screen near the edge of the drawer will not slide in the drawer a bit
   * to promote accidental discovery of the swipe gesture.
   * @default false
   */
  disableDiscovery: _propTypes.default.bool,
  /**
   * If `true`, swipe to open is disabled. This is useful in browsers where swiping triggers
   * navigation actions. Swipe to open is disabled on iOS browsers by default.
   * @default typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
   */
  disableSwipeToOpen: _propTypes.default.bool,
  /**
   * @ignore
   */
  hideBackdrop: _propTypes.default.bool,
  /**
   * Affects how far the drawer must be opened/closed to change its state.
   * Specified as percent (0-1) of the width of the drawer
   * @default 0.52
   */
  hysteresis: _propTypes.default.number,
  /**
   * Defines, from which (average) velocity on, the swipe is
   * defined as complete although hysteresis isn't reached.
   * Good threshold is between 250 - 1000 px/s
   * @default 450
   */
  minFlingVelocity: _propTypes.default.number,
  /**
   * @ignore
   */
  ModalProps: _propTypes.default /* @typescript-to-proptypes-ignore */.shape({
    BackdropProps: _propTypes.default.shape({
      component: _elementTypeAcceptingRef.default
    })
  }),
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent<{}>} event The event source of the callback.
   */
  onClose: _propTypes.default.func.isRequired,
  /**
   * Callback fired when the component requests to be opened.
   *
   * @param {React.SyntheticEvent<{}>} event The event source of the callback.
   */
  onOpen: _propTypes.default.func.isRequired,
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: _propTypes.default.bool,
  /**
   * @ignore
   */
  PaperProps: _propTypes.default /* @typescript-to-proptypes-ignore */.shape({
    component: _elementTypeAcceptingRef.default,
    style: _propTypes.default.object
  }),
  /**
   * The element is used to intercept the touch events on the edge.
   */
  SwipeAreaProps: _propTypes.default.object,
  /**
   * The width of the left most (or right most) area in `px` that
   * the drawer can be swiped open from.
   * @default 20
   */
  swipeAreaWidth: _propTypes.default.number,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),
  /**
   * @ignore
   */
  variant: _propTypes.default.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;
var _default = exports.default = SwipeableDrawer;