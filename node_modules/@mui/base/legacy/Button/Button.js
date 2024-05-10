'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { getButtonUtilityClass } from './buttonClasses';
import { useButton } from '../useButton';
import { useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var active = ownerState.active,
    disabled = ownerState.disabled,
    focusVisible = ownerState.focusVisible;
  var slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active']
  };
  return composeClasses(slots, useClassNamesOverride(getButtonUtilityClass));
};
/**
 * The foundation for building custom-styled buttons.
 *
 * Demos:
 *
 * - [Button](https://mui.com/base-ui/react-button/)
 *
 * API:
 *
 * - [Button API](https://mui.com/base-ui/react-button/components-api/#button)
 */
var Button = /*#__PURE__*/React.forwardRef(function Button(props, forwardedRef) {
  var _slots$root;
  var action = props.action,
    children = props.children,
    disabled = props.disabled,
    _props$focusableWhenD = props.focusableWhenDisabled,
    focusableWhenDisabled = _props$focusableWhenD === void 0 ? false : _props$focusableWhenD,
    onFocusVisible = props.onFocusVisible,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$rootElementNam = props.rootElementName,
    rootElementNameProp = _props$rootElementNam === void 0 ? 'button' : _props$rootElementNam,
    other = _objectWithoutProperties(props, ["action", "children", "disabled", "focusableWhenDisabled", "onFocusVisible", "slotProps", "slots", "rootElementName"]);
  var buttonRef = React.useRef();
  var rootElementName = rootElementNameProp;
  if (typeof slots.root === 'string') {
    rootElementName = slots.root;
  } else if (other.href || other.to) {
    rootElementName = 'a';
  }
  var _useButton = useButton(_extends({}, props, {
      focusableWhenDisabled: focusableWhenDisabled,
      rootElementName: rootElementName
    })),
    active = _useButton.active,
    focusVisible = _useButton.focusVisible,
    setFocusVisible = _useButton.setFocusVisible,
    getRootProps = _useButton.getRootProps;
  React.useImperativeHandle(action, function () {
    return {
      focusVisible: function focusVisible() {
        setFocusVisible(true);
        buttonRef.current.focus();
      }
    };
  }, [setFocusVisible]);
  var ownerState = _extends({}, props, {
    active: active,
    focusableWhenDisabled: focusableWhenDisabled,
    focusVisible: focusVisible
  });
  var classes = useUtilityClasses(ownerState);
  var defaultElement = other.href || other.to ? 'a' : 'button';
  var Root = (_slots$root = slots.root) != null ? _slots$root : defaultElement;
  var rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef
    },
    ownerState: ownerState,
    className: classes.root
  });
  return /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? Button.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.shape({
      focusVisible: PropTypes.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, allows a disabled button to receive focus.
   * @default false
   */
  focusableWhenDisabled: PropTypes.bool,
  /**
   * @ignore
   */
  href: PropTypes.string,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * The HTML element that is ultimately rendered, for example 'button' or 'a'
   * @default 'button'
   */
  rootElementName: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * The props used for each slot inside the Button.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Button.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * @ignore
   */
  to: PropTypes.string
} : void 0;
export { Button };