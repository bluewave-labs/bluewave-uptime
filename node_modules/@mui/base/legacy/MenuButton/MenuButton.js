'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSlotProps } from '../utils';
import { useMenuButton } from '../useMenuButton';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { getMenuButtonUtilityClass } from './menuButtonClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var active = ownerState.active,
    disabled = ownerState.disabled,
    open = ownerState.open;
  var slots = {
    root: ['root', disabled && 'disabled', active && 'active', open && 'expanded']
  };
  return composeClasses(slots, useClassNamesOverride(getMenuButtonUtilityClass));
};

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [MenuButton API](https://mui.com/base-ui/react-menu/components-api/#menu-button)
 */
var MenuButton = /*#__PURE__*/React.forwardRef(function MenuButton(props, forwardedRef) {
  var children = props.children,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    label = props.label,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$focusableWhenD = props.focusableWhenDisabled,
    focusableWhenDisabled = _props$focusableWhenD === void 0 ? false : _props$focusableWhenD,
    other = _objectWithoutProperties(props, ["children", "disabled", "label", "slots", "slotProps", "focusableWhenDisabled"]);
  var _useMenuButton = useMenuButton({
      disabled: disabled,
      focusableWhenDisabled: focusableWhenDisabled,
      rootRef: forwardedRef
    }),
    getRootProps = _useMenuButton.getRootProps,
    open = _useMenuButton.open,
    active = _useMenuButton.active;
  var ownerState = _extends({}, props, {
    open: open,
    active: active,
    disabled: disabled,
    focusableWhenDisabled: focusableWhenDisabled
  });
  var classes = useUtilityClasses(ownerState);
  var Root = slots.root || 'button';
  var rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
      type: 'button'
    },
    ownerState: ownerState,
    className: classes.root
  });
  return /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? MenuButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
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
   * Label of the button
   */
  label: PropTypes.string,
  /**
   * The components used for each slot inside the MenuButton.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The props used for each slot inside the MenuButton.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  })
} : void 0;
export { MenuButton };