"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickersPopper = PickersPopper;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/base/utils");
var _Grow = _interopRequireDefault(require("@mui/material/Grow"));
var _Fade = _interopRequireDefault(require("@mui/material/Fade"));
var _Paper = _interopRequireDefault(require("@mui/material/Paper"));
var _Popper = _interopRequireDefault(require("@mui/material/Popper"));
var _Unstable_TrapFocus = _interopRequireDefault(require("@mui/material/Unstable_TrapFocus"));
var _utils2 = require("@mui/utils");
var _styles = require("@mui/material/styles");
var _pickersPopperClasses = require("./pickersPopperClasses");
var _utils3 = require("../utils/utils");
var _useDefaultReduceAnimations = require("../hooks/useDefaultReduceAnimations");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["PaperComponent", "popperPlacement", "ownerState", "children", "paperSlotProps", "paperClasses", "onPaperClick", "onPaperTouchStart"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    paper: ['paper']
  };
  return (0, _utils2.unstable_composeClasses)(slots, _pickersPopperClasses.getPickersPopperUtilityClass, classes);
};
const PickersPopperRoot = (0, _styles.styled)(_Popper.default, {
  name: 'MuiPickersPopper',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  zIndex: theme.zIndex.modal
}));
const PickersPopperPaper = (0, _styles.styled)(_Paper.default, {
  name: 'MuiPickersPopper',
  slot: 'Paper',
  overridesResolver: (_, styles) => styles.paper
})({
  outline: 0,
  transformOrigin: 'top center',
  variants: [{
    props: ({
      placement
    }) => ['top', 'top-start', 'top-end'].includes(placement),
    style: {
      transformOrigin: 'bottom center'
    }
  }]
});
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
/**
 * Based on @mui/material/ClickAwayListener without the customization.
 * We can probably strip away even more since children won't be portaled.
 * @param {boolean} active Only listen to clicks when the popper is opened.
 * @param {(event: MouseEvent | TouchEvent) => void} onClickAway The callback to call when clicking outside the popper.
 * @returns {Array} The ref and event handler to listen to the outside clicks.
 */
function useClickAwayListener(active, onClickAway) {
  const movedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);
  const nodeRef = React.useRef(null);
  const activatedRef = React.useRef(false);
  React.useEffect(() => {
    if (!active) {
      return undefined;
    }

    // Ensure that this hook is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    function armClickAwayListener() {
      activatedRef.current = true;
    }
    document.addEventListener('mousedown', armClickAwayListener, true);
    document.addEventListener('touchstart', armClickAwayListener, true);
    return () => {
      document.removeEventListener('mousedown', armClickAwayListener, true);
      document.removeEventListener('touchstart', armClickAwayListener, true);
      activatedRef.current = false;
    };
  }, [active]);

  // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviors like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.
  const handleClickAway = (0, _utils2.unstable_useEventCallback)(event => {
    if (!activatedRef.current) {
      return;
    }

    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = (0, _utils2.unstable_ownerDocument)(nodeRef.current);

    // 1. IE11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.
    if (!nodeRef.current ||
    // is a TouchEvent?
    'clientX' in event && clickedRootScrollbar(event, doc)) {
      return;
    }

    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;

    // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM = !doc.documentElement.contains(event.target) || nodeRef.current.contains(event.target);
    }
    if (!insideDOM && !insideReactTree) {
      onClickAway(event);
    }
  });

  // Keep track of mouse/touch events that bubbled up through the portal.
  const handleSynthetic = () => {
    syntheticEventRef.current = true;
  };
  React.useEffect(() => {
    if (active) {
      const doc = (0, _utils2.unstable_ownerDocument)(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener('touchstart', handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return () => {
        doc.removeEventListener('touchstart', handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }
    return undefined;
  }, [active, handleClickAway]);
  React.useEffect(() => {
    // TODO This behavior is not tested automatically
    // It's unclear whether this is due to different update semantics in test (batched in act() vs discrete on click).
    // Or if this is a timing related issues due to different Transition components
    // Once we get rid of all the manual scheduling (for example setTimeout(update, 0)) we can revisit this code+test.
    if (active) {
      const doc = (0, _utils2.unstable_ownerDocument)(nodeRef.current);
      doc.addEventListener('click', handleClickAway);
      return () => {
        doc.removeEventListener('click', handleClickAway);
        // cleanup `handleClickAway`
        syntheticEventRef.current = false;
      };
    }
    return undefined;
  }, [active, handleClickAway]);
  return [nodeRef, handleSynthetic, handleSynthetic];
}
const PickersPopperPaperWrapper = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      PaperComponent,
      popperPlacement,
      ownerState: inOwnerState,
      children,
      paperSlotProps,
      paperClasses,
      onPaperClick,
      onPaperTouchStart
      // picks up the style props provided by `Transition`
      // https://mui.com/material-ui/transitions/#child-requirement
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, inOwnerState, {
    placement: popperPlacement
  });
  const paperProps = (0, _utils.useSlotProps)({
    elementType: PaperComponent,
    externalSlotProps: paperSlotProps,
    additionalProps: {
      tabIndex: -1,
      elevation: 8,
      ref
    },
    className: paperClasses,
    ownerState
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PaperComponent, (0, _extends2.default)({}, other, paperProps, {
    onClick: event => {
      onPaperClick(event);
      paperProps.onClick?.(event);
    },
    onTouchStart: event => {
      onPaperTouchStart(event);
      paperProps.onTouchStart?.(event);
    },
    ownerState: ownerState,
    children: children
  }));
});
function PickersPopper(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiPickersPopper'
  });
  const {
    anchorEl,
    children,
    containerRef = null,
    shouldRestoreFocus,
    onBlur,
    onDismiss,
    open,
    role,
    placement,
    slots,
    slotProps,
    reduceAnimations: inReduceAnimations
  } = props;
  React.useEffect(() => {
    function handleKeyDown(nativeEvent) {
      if (open && nativeEvent.key === 'Escape') {
        onDismiss();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDismiss, open]);
  const lastFocusedElementRef = React.useRef(null);
  React.useEffect(() => {
    if (role === 'tooltip' || shouldRestoreFocus && !shouldRestoreFocus()) {
      return;
    }
    if (open) {
      lastFocusedElementRef.current = (0, _utils3.getActiveElement)(document);
    } else if (lastFocusedElementRef.current && lastFocusedElementRef.current instanceof HTMLElement) {
      // make sure the button is flushed with updated label, before returning focus to it
      // avoids issue, where screen reader could fail to announce selected date after selection
      setTimeout(() => {
        if (lastFocusedElementRef.current instanceof HTMLElement) {
          lastFocusedElementRef.current.focus();
        }
      });
    }
  }, [open, role, shouldRestoreFocus]);
  const [clickAwayRef, onPaperClick, onPaperTouchStart] = useClickAwayListener(open, onBlur ?? onDismiss);
  const paperRef = React.useRef(null);
  const handleRef = (0, _utils2.unstable_useForkRef)(paperRef, containerRef);
  const handlePaperRef = (0, _utils2.unstable_useForkRef)(handleRef, clickAwayRef);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const defaultReduceAnimations = (0, _useDefaultReduceAnimations.useDefaultReduceAnimations)();
  const reduceAnimations = inReduceAnimations ?? defaultReduceAnimations;
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      // stop the propagation to avoid closing parent modal
      event.stopPropagation();
      onDismiss();
    }
  };
  const Transition = slots?.desktopTransition ?? reduceAnimations ? _Fade.default : _Grow.default;
  const FocusTrap = slots?.desktopTrapFocus ?? _Unstable_TrapFocus.default;
  const Paper = slots?.desktopPaper ?? PickersPopperPaper;
  const Popper = slots?.popper ?? PickersPopperRoot;
  const popperProps = (0, _utils.useSlotProps)({
    elementType: Popper,
    externalSlotProps: slotProps?.popper,
    additionalProps: {
      transition: true,
      role,
      open,
      anchorEl,
      placement,
      onKeyDown: handleKeyDown
    },
    className: classes.root,
    ownerState: props
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Popper, (0, _extends2.default)({}, popperProps, {
    children: ({
      TransitionProps,
      placement: popperPlacement
    }) => /*#__PURE__*/(0, _jsxRuntime.jsx)(FocusTrap, (0, _extends2.default)({
      open: open,
      disableAutoFocus: true
      // pickers are managing focus position manually
      // without this prop the focus is returned to the button before `aria-label` is updated
      // which would force screen readers to read too old label
      ,
      disableRestoreFocus: true,
      disableEnforceFocus: role === 'tooltip',
      isEnabled: () => true
    }, slotProps?.desktopTrapFocus, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Transition, (0, _extends2.default)({}, TransitionProps, slotProps?.desktopTransition, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersPopperPaperWrapper, {
          PaperComponent: Paper,
          ownerState: ownerState,
          popperPlacement: popperPlacement,
          ref: handlePaperRef,
          onPaperClick: onPaperClick,
          onPaperTouchStart: onPaperTouchStart,
          paperClasses: classes.paper,
          paperSlotProps: slotProps?.desktopPaper,
          children: children
        })
      }))
    }))
  }));
}