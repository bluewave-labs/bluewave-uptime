'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { getMenuItemUtilityClass } from './menuItemClasses';
import { useMenuItem, useMenuItemContextStabilizer } from '../useMenuItem';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { useSlotProps } from '../utils/useSlotProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { ListContext } from '../useList';
import { jsx as _jsx } from "react/jsx-runtime";
function useUtilityClasses(ownerState) {
  var disabled = ownerState.disabled,
    focusVisible = ownerState.focusVisible;
  var slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible']
  };
  return composeClasses(slots, useClassNamesOverride(getMenuItemUtilityClass));
}
var InnerMenuItem = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function MenuItem(props, forwardedRef) {
  var _slots$root;
  var children = props.children,
    _props$disabled = props.disabled,
    disabledProp = _props$disabled === void 0 ? false : _props$disabled,
    label = props.label,
    id = props.id,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["children", "disabled", "label", "id", "slotProps", "slots"]);
  var _useMenuItem = useMenuItem({
      id: id,
      disabled: disabledProp,
      rootRef: forwardedRef,
      label: label
    }),
    getRootProps = _useMenuItem.getRootProps,
    disabled = _useMenuItem.disabled,
    focusVisible = _useMenuItem.focusVisible,
    highlighted = _useMenuItem.highlighted;
  var ownerState = _extends({}, props, {
    disabled: disabled,
    focusVisible: focusVisible,
    highlighted: highlighted
  });
  var classes = useUtilityClasses(ownerState);
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'li';
  var rootProps = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    className: classes.root,
    ownerState: ownerState
  });
  return /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
    children: children
  }));
}));

/**
 * An unstyled menu item to be used within a Menu.
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [MenuItem API](https://mui.com/base-ui/react-menu/components-api/#menu-item)
 */
var MenuItem = /*#__PURE__*/React.forwardRef(function MenuItem(props, ref) {
  var idProp = props.id; // This wrapper component is used as a performance optimization.
  // `useMenuItemContextStabilizer` ensures that the context value
  // is stable across renders, so that the actual MenuItem re-renders
  // only when it needs to.
  var _useMenuItemContextSt = useMenuItemContextStabilizer(idProp),
    contextValue = _useMenuItemContextSt.contextValue,
    id = _useMenuItemContextSt.id;
  return /*#__PURE__*/_jsx(ListContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(InnerMenuItem, _extends({}, props, {
      id: id,
      ref: ref
    }))
  });
});
process.env.NODE_ENV !== "production" ? MenuItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the menu item will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the menu item won't receive focus when the mouse moves over it.
   *
   * @default false
   */
  disableFocusOnHover: PropTypes.bool,
  /**
   * A text representation of the menu item's content.
   * Used for keyboard text navigation matching.
   */
  label: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * The props used for each slot inside the MenuItem.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the MenuItem.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  })
} : void 0;
export { MenuItem };