'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType, refType } from '@mui/utils';
import { getMenuUtilityClass } from './menuClasses';
import { useMenu } from '../useMenu';
import { MenuProvider } from '../useMenu/MenuProvider';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { Unstable_Popup as Popup } from '../Unstable_Popup';
import { useSlotProps } from '../utils/useSlotProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { ListActionTypes } from '../useList';
import { jsx as _jsx } from "react/jsx-runtime";
function useUtilityClasses(ownerState) {
  var open = ownerState.open;
  var slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded']
  };
  return composeClasses(slots, useClassNamesOverride(getMenuUtilityClass));
}

/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base-ui/react-menu/)
 *
 * API:
 *
 * - [Menu API](https://mui.com/base-ui/react-menu/components-api/#menu)
 */
var Menu = /*#__PURE__*/React.forwardRef(function Menu(props, forwardedRef) {
  var _slots$root, _slots$listbox;
  var actions = props.actions,
    anchorProp = props.anchor,
    children = props.children,
    onItemsChange = props.onItemsChange,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["actions", "anchor", "children", "onItemsChange", "slotProps", "slots"]);
  var _useMenu = useMenu({
      onItemsChange: onItemsChange,
      componentName: 'Menu'
    }),
    contextValue = _useMenu.contextValue,
    getListboxProps = _useMenu.getListboxProps,
    dispatch = _useMenu.dispatch,
    open = _useMenu.open,
    triggerElement = _useMenu.triggerElement;
  var anchor = anchorProp != null ? anchorProp : triggerElement;
  React.useImperativeHandle(actions, function () {
    return {
      dispatch: dispatch,
      resetHighlight: function resetHighlight() {
        return dispatch({
          type: ListActionTypes.resetHighlight,
          event: null
        });
      }
    };
  }, [dispatch]);
  var ownerState = _extends({}, props, {
    open: open
  });
  var classes = useUtilityClasses(ownerState);
  var Root = (_slots$root = slots.root) != null ? _slots$root : 'div';
  var rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref: forwardedRef,
      role: undefined
    },
    className: classes.root,
    ownerState: ownerState
  });
  var Listbox = (_slots$listbox = slots.listbox) != null ? _slots$listbox : 'ul';
  var listboxProps = useSlotProps({
    elementType: Listbox,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    className: classes.listbox,
    ownerState: ownerState
  });
  if (open === true && anchor == null) {
    return /*#__PURE__*/_jsx(Root, _extends({}, rootProps, {
      children: /*#__PURE__*/_jsx(Listbox, _extends({}, listboxProps, {
        children: /*#__PURE__*/_jsx(MenuProvider, {
          value: contextValue,
          children: children
        })
      }))
    }));
  }
  return /*#__PURE__*/_jsx(Popup, _extends({
    keepMounted: true
  }, rootProps, {
    open: open,
    anchor: anchor,
    slots: {
      root: Root
    },
    children: /*#__PURE__*/_jsx(Listbox, _extends({}, listboxProps, {
      children: /*#__PURE__*/_jsx(MenuProvider, {
        value: contextValue,
        children: children
      })
    }))
  }));
});
process.env.NODE_ENV !== "production" ? Menu.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref with imperative actions that can be performed on the menu.
   */
  actions: refType,
  /**
   * The element based on which the menu is positioned.
   */
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([HTMLElementType, PropTypes.object, PropTypes.func]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Function called when the items displayed in the menu change.
   */
  onItemsChange: PropTypes.func,
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: PropTypes.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    root: PropTypes.elementType
  })
} : void 0;
export { Menu };