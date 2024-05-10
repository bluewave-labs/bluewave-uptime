'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { unstable_useEventCallback as useEventCallback, unstable_useTimeout as useTimeout } from '@mui/utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';
/**
 * The basic building block for creating custom snackbar.
 *
 * Demos:
 *
 * - [Snackbar](https://mui.com/base-ui/react-snackbar/#hook)
 *
 * API:
 *
 * - [useSnackbar API](https://mui.com/base-ui/react-snackbar/hooks-api/#use-snackbar)
 */
export function useSnackbar() {
  var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _parameters$autoHideD = parameters.autoHideDuration,
    autoHideDuration = _parameters$autoHideD === void 0 ? null : _parameters$autoHideD,
    _parameters$disableWi = parameters.disableWindowBlurListener,
    disableWindowBlurListener = _parameters$disableWi === void 0 ? false : _parameters$disableWi,
    onClose = parameters.onClose,
    open = parameters.open,
    resumeHideDuration = parameters.resumeHideDuration;
  var timerAutoHide = useTimeout();
  React.useEffect(function () {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent) {
      if (!nativeEvent.defaultPrevented) {
        // IE11, Edge (prior to using Blink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          // not calling `preventDefault` since we don't know if people may ignore this event e.g. a permanently open snackbar
          onClose == null || onClose(nativeEvent, 'escapeKeyDown');
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);
  var handleClose = useEventCallback(function (event, reason) {
    onClose == null || onClose(event, reason);
  });
  var setAutoHideTimer = useEventCallback(function (autoHideDurationParam) {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }
    timerAutoHide.start(autoHideDurationParam, function () {
      handleClose(null, 'timeout');
    });
  });
  React.useEffect(function () {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }
    return timerAutoHide.clear;
  }, [open, autoHideDuration, setAutoHideTimer, timerAutoHide]);
  var handleClickAway = function handleClickAway(event) {
    onClose == null || onClose(event, 'clickaway');
  };

  // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.
  var handlePause = timerAutoHide.clear;

  // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.
  var handleResume = React.useCallback(function () {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);
  var createHandleBlur = function createHandleBlur(otherHandlers) {
    return function (event) {
      var onBlurCallback = otherHandlers.onBlur;
      onBlurCallback == null || onBlurCallback(event);
      handleResume();
    };
  };
  var createHandleFocus = function createHandleFocus(otherHandlers) {
    return function (event) {
      var onFocusCallback = otherHandlers.onFocus;
      onFocusCallback == null || onFocusCallback(event);
      handlePause();
    };
  };
  var createMouseEnter = function createMouseEnter(otherHandlers) {
    return function (event) {
      var onMouseEnterCallback = otherHandlers.onMouseEnter;
      onMouseEnterCallback == null || onMouseEnterCallback(event);
      handlePause();
    };
  };
  var createMouseLeave = function createMouseLeave(otherHandlers) {
    return function (event) {
      var onMouseLeaveCallback = otherHandlers.onMouseLeave;
      onMouseLeaveCallback == null || onMouseLeaveCallback(event);
      handleResume();
    };
  };
  React.useEffect(function () {
    // TODO: window global should be refactored here
    if (!disableWindowBlurListener && open) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);
      return function () {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
    }
    return undefined;
  }, [disableWindowBlurListener, open, handleResume, handlePause]);
  var getRootProps = function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalEventHandlers = _extends({}, extractEventHandlers(parameters), extractEventHandlers(externalProps));
    return _extends({
      // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
      // See https://github.com/mui/material-ui/issues/29080
      role: 'presentation'
    }, externalProps, externalEventHandlers, {
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onMouseEnter: createMouseEnter(externalEventHandlers),
      onMouseLeave: createMouseLeave(externalEventHandlers)
    });
  };
  return {
    getRootProps: getRootProps,
    onClickAway: handleClickAway
  };
}