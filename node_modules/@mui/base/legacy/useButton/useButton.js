'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useIsFocusVisible as useIsFocusVisible } from '@mui/utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useRootElementName } from '../utils/useRootElementName';
/**
 *
 * Demos:
 *
 * - [Button](https://mui.com/base-ui/react-button/#hook)
 *
 * API:
 *
 * - [useButton API](https://mui.com/base-ui/react-button/hooks-api/#use-button)
 */
export function useButton() {
  var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _parameters$disabled = parameters.disabled,
    disabled = _parameters$disabled === void 0 ? false : _parameters$disabled,
    focusableWhenDisabled = parameters.focusableWhenDisabled,
    href = parameters.href,
    externalRef = parameters.rootRef,
    tabIndex = parameters.tabIndex,
    to = parameters.to,
    type = parameters.type,
    rootElementNameProp = parameters.rootElementName;
  var buttonRef = React.useRef();
  var _React$useState = React.useState(false),
    active = _React$useState[0],
    setActive = _React$useState[1];
  var _useIsFocusVisible = useIsFocusVisible(),
    isFocusVisibleRef = _useIsFocusVisible.isFocusVisibleRef,
    handleFocusVisible = _useIsFocusVisible.onFocus,
    handleBlurVisible = _useIsFocusVisible.onBlur,
    focusVisibleRef = _useIsFocusVisible.ref;
  var _React$useState2 = React.useState(false),
    focusVisible = _React$useState2[0],
    setFocusVisible = _React$useState2[1];
  if (disabled && !focusableWhenDisabled && focusVisible) {
    setFocusVisible(false);
  }
  React.useEffect(function () {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  var _useRootElementName = useRootElementName({
      rootElementName: rootElementNameProp != null ? rootElementNameProp : href || to ? 'a' : undefined,
      componentName: 'Button'
    }),
    _useRootElementName2 = _slicedToArray(_useRootElementName, 2),
    rootElementName = _useRootElementName2[0],
    updateRootElementName = _useRootElementName2[1];
  var createHandleMouseLeave = function createHandleMouseLeave(otherHandlers) {
    return function (event) {
      var _otherHandlers$onMous;
      if (focusVisible) {
        event.preventDefault();
      }
      (_otherHandlers$onMous = otherHandlers.onMouseLeave) == null || _otherHandlers$onMous.call(otherHandlers, event);
    };
  };
  var createHandleBlur = function createHandleBlur(otherHandlers) {
    return function (event) {
      var _otherHandlers$onBlur;
      handleBlurVisible(event);
      if (isFocusVisibleRef.current === false) {
        setFocusVisible(false);
      }
      (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
    };
  };
  var createHandleFocus = function createHandleFocus(otherHandlers) {
    return function (event) {
      var _otherHandlers$onFocu2;
      // Fix for https://github.com/facebook/react/issues/7769
      if (!buttonRef.current) {
        buttonRef.current = event.currentTarget;
      }
      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        var _otherHandlers$onFocu;
        setFocusVisible(true);
        (_otherHandlers$onFocu = otherHandlers.onFocusVisible) == null || _otherHandlers$onFocu.call(otherHandlers, event);
      }
      (_otherHandlers$onFocu2 = otherHandlers.onFocus) == null || _otherHandlers$onFocu2.call(otherHandlers, event);
    };
  };
  var isNativeButton = function isNativeButton() {
    var button = buttonRef.current;
    return rootElementName === 'BUTTON' || rootElementName === 'INPUT' && ['button', 'submit', 'reset'].includes(button == null ? void 0 : button.type) || rootElementName === 'A' && (button == null ? void 0 : button.href);
  };
  var createHandleClick = function createHandleClick(otherHandlers) {
    return function (event) {
      if (!disabled) {
        var _otherHandlers$onClic;
        (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
      }
    };
  };
  var createHandleMouseDown = function createHandleMouseDown(otherHandlers) {
    return function (event) {
      var _otherHandlers$onMous2;
      if (!disabled) {
        setActive(true);
        document.addEventListener('mouseup', function () {
          setActive(false);
        }, {
          once: true
        });
      }
      (_otherHandlers$onMous2 = otherHandlers.onMouseDown) == null || _otherHandlers$onMous2.call(otherHandlers, event);
    };
  };
  var createHandleKeyDown = function createHandleKeyDown(otherHandlers) {
    return function (event) {
      var _otherHandlers$onKeyD;
      (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
      if (event.defaultMuiPrevented) {
        return;
      }
      if (event.target === event.currentTarget && !isNativeButton() && event.key === ' ') {
        event.preventDefault();
      }
      if (event.target === event.currentTarget && event.key === ' ' && !disabled) {
        setActive(true);
      }

      // Keyboard accessibility for non interactive elements
      if (event.target === event.currentTarget && !isNativeButton() && event.key === 'Enter' && !disabled) {
        var _otherHandlers$onClic2;
        (_otherHandlers$onClic2 = otherHandlers.onClick) == null || _otherHandlers$onClic2.call(otherHandlers, event);
        event.preventDefault();
      }
    };
  };
  var createHandleKeyUp = function createHandleKeyUp(otherHandlers) {
    return function (event) {
      var _otherHandlers$onKeyU;
      // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
      // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0

      if (event.target === event.currentTarget) {
        setActive(false);
      }
      (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null || _otherHandlers$onKeyU.call(otherHandlers, event);

      // Keyboard accessibility for non interactive elements
      if (event.target === event.currentTarget && !isNativeButton() && !disabled && event.key === ' ' && !event.defaultMuiPrevented) {
        var _otherHandlers$onClic3;
        (_otherHandlers$onClic3 = otherHandlers.onClick) == null || _otherHandlers$onClic3.call(otherHandlers, event);
      }
    };
  };
  var handleRef = useForkRef(updateRootElementName, externalRef, focusVisibleRef, buttonRef);
  var buttonProps = {};
  if (tabIndex !== undefined) {
    buttonProps.tabIndex = tabIndex;
  }
  if (rootElementName === 'BUTTON') {
    buttonProps.type = type != null ? type : 'button';
    if (focusableWhenDisabled) {
      buttonProps['aria-disabled'] = disabled;
    } else {
      buttonProps.disabled = disabled;
    }
  } else if (rootElementName === 'INPUT') {
    if (type && ['button', 'submit', 'reset'].includes(type)) {
      if (focusableWhenDisabled) {
        buttonProps['aria-disabled'] = disabled;
      } else {
        buttonProps.disabled = disabled;
      }
    }
  } else if (rootElementName !== '') {
    if (!href && !to) {
      buttonProps.role = 'button';
      buttonProps.tabIndex = tabIndex != null ? tabIndex : 0;
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
      buttonProps.tabIndex = focusableWhenDisabled ? tabIndex != null ? tabIndex : 0 : -1;
    }
  }
  var getRootProps = function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var externalEventHandlers = _extends({}, extractEventHandlers(parameters), extractEventHandlers(externalProps));
    var props = _extends({
      type: type
    }, externalEventHandlers, buttonProps, externalProps, {
      onBlur: createHandleBlur(externalEventHandlers),
      onClick: createHandleClick(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      onKeyUp: createHandleKeyUp(externalEventHandlers),
      onMouseDown: createHandleMouseDown(externalEventHandlers),
      onMouseLeave: createHandleMouseLeave(externalEventHandlers),
      ref: handleRef
    });

    // onFocusVisible can be present on the props or parameters,
    // but it's not a valid React event handler so it must not be forwarded to the inner component.
    // If present, it will be handled by the focus handler.
    delete props.onFocusVisible;
    return props;
  };
  return {
    getRootProps: getRootProps,
    focusVisible: focusVisible,
    setFocusVisible: setFocusVisible,
    active: active,
    rootRef: handleRef
  };
}