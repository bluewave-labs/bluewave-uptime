"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useTouchRipple = props => {
  const {
    disabled,
    disableFocusRipple,
    disableRipple,
    disableTouchRipple,
    focusVisible,
    rippleRef
  } = props;
  React.useEffect(() => {
    if (focusVisible && !disableFocusRipple && !disableRipple) {
      var _rippleRef$current;
      (_rippleRef$current = rippleRef.current) == null || _rippleRef$current.pulsate();
    }
  }, [rippleRef, focusVisible, disableFocusRipple, disableRipple]);
  function useRippleHandler(rippleAction, skipRippleAction = disableTouchRipple) {
    return (0, _utils.useEventCallback)(event => {
      if (!skipRippleAction && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }
      return true;
    });
  }
  const keydownRef = React.useRef(false);
  const handleKeyDown = (0, _utils.useEventCallback)(event => {
    if (!disableFocusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === ' ') {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        var _rippleRef$current2;
        rippleRef == null || (_rippleRef$current2 = rippleRef.current) == null || _rippleRef$current2.start(event);
      });
    }
  });
  const handleKeyUp = (0, _utils.useEventCallback)(event => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
    if (!disableFocusRipple && event.key === ' ' && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        var _rippleRef$current3;
        rippleRef == null || (_rippleRef$current3 = rippleRef.current) == null || _rippleRef$current3.pulsate(event);
      });
    }
  });
  const handleBlur = useRippleHandler('stop', false);
  const handleMouseDown = useRippleHandler('start');
  const handleContextMenu = useRippleHandler('stop');
  const handleDragLeave = useRippleHandler('stop');
  const handleMouseUp = useRippleHandler('stop');
  const handleMouseLeave = useRippleHandler('stop');
  const handleTouchStart = useRippleHandler('start');
  const handleTouchEnd = useRippleHandler('stop');
  const handleTouchMove = useRippleHandler('stop');
  const [mountedState, setMountedState] = React.useState(false);
  React.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  const getRippleHandlers = React.useMemo(() => {
    const rippleHandlers = {
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onContextMenu: handleContextMenu,
      onDragLeave: handleDragLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove
    };
    return (otherEvents = {}) => {
      const eventNames = Object.keys(rippleHandlers);
      const wrappedEvents = eventNames.map(eventName => ({
        name: eventName,
        handler: ev => {
          var _otherEvents$eventNam;
          (_otherEvents$eventNam = otherEvents[eventName]) == null || _otherEvents$eventNam.call(otherEvents, ev);
          rippleHandlers[eventName](ev);
        }
      }));
      return wrappedEvents.reduce((acc, current) => {
        acc[current.name] = current.handler;
        return acc;
      }, {});
    };
  }, [handleBlur, handleKeyDown, handleKeyUp, handleMouseDown, handleMouseUp, handleMouseLeave, handleContextMenu, handleDragLeave, handleTouchStart, handleTouchEnd, handleTouchMove]);
  return {
    enableTouchRipple,
    getRippleHandlers
  };
};
var _default = exports.default = useTouchRipple;