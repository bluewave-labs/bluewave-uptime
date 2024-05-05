'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { isHostComponent } from '@mui/base/utils';
import composeClasses from '@mui/utils/composeClasses';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import chainPropTypes from '@mui/utils/chainPropTypes';
import { alpha } from '@mui/system/colorManipulator';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import isMuiElement from '../utils/isMuiElement';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';
import { listItemButtonClasses } from '../ListItemButton';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var overridesResolver = function overridesResolver(props, styles) {
  var ownerState = props.ownerState;
  return [styles.root, ownerState.dense && styles.dense, ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters, !ownerState.disablePadding && styles.padding, ownerState.button && styles.button, ownerState.hasSecondaryAction && styles.secondaryAction];
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var alignItems = ownerState.alignItems,
    button = ownerState.button,
    classes = ownerState.classes,
    dense = ownerState.dense,
    disabled = ownerState.disabled,
    disableGutters = ownerState.disableGutters,
    disablePadding = ownerState.disablePadding,
    divider = ownerState.divider,
    hasSecondaryAction = ownerState.hasSecondaryAction,
    selected = ownerState.selected;
  var slots = {
    root: ['root', dense && 'dense', !disableGutters && 'gutters', !disablePadding && 'padding', divider && 'divider', disabled && 'disabled', button && 'button', alignItems === 'flex-start' && 'alignItemsFlexStart', hasSecondaryAction && 'secondaryAction', selected && 'selected'],
    container: ['container']
  };
  return composeClasses(slots, getListItemUtilityClass, classes);
};
export var ListItemRoot = styled('div', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left'
  }, !ownerState.disablePadding && _extends({
    paddingTop: 8,
    paddingBottom: 8
  }, ownerState.dense && {
    paddingTop: 4,
    paddingBottom: 4
  }, !ownerState.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16
  }, !!ownerState.secondaryAction && {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positioned.
    paddingRight: 48
  }), !!ownerState.secondaryAction && _defineProperty({}, "& > .".concat(listItemButtonClasses.root), {
    paddingRight: 48
  }), _defineProperty(_defineProperty(_defineProperty({}, "&.".concat(listItemClasses.focusVisible), {
    backgroundColor: (theme.vars || theme).palette.action.focus
  }), "&.".concat(listItemClasses.selected), _defineProperty({
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / ").concat(theme.vars.palette.action.selectedOpacity, ")") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
  }, "&.".concat(listItemClasses.focusVisible), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.focusOpacity, "))") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  })), "&.".concat(listItemClasses.disabled), {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }), ownerState.alignItems === 'flex-start' && {
    alignItems: 'flex-start'
  }, ownerState.divider && {
    borderBottom: "1px solid ".concat((theme.vars || theme).palette.divider),
    backgroundClip: 'padding-box'
  }, ownerState.button && _defineProperty({
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }, "&.".concat(listItemClasses.selected, ":hover"), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.hoverOpacity, "))") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / ").concat(theme.vars.palette.action.selectedOpacity, ")") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }), ownerState.hasSecondaryAction && {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positioned.
    paddingRight: 48
  });
});
var ListItemContainer = styled('li', {
  name: 'MuiListItem',
  slot: 'Container',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.container;
  }
})({
  position: 'relative'
});

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */
var ListItem = /*#__PURE__*/React.forwardRef(function ListItem(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListItem'
  });
  var _props$alignItems = props.alignItems,
    alignItems = _props$alignItems === void 0 ? 'center' : _props$alignItems,
    _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
    _props$button = props.button,
    button = _props$button === void 0 ? false : _props$button,
    childrenProp = props.children,
    className = props.className,
    componentProp = props.component,
    _props$components = props.components,
    components = _props$components === void 0 ? {} : _props$components,
    _props$componentsProp = props.componentsProps,
    componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
    _props$ContainerCompo = props.ContainerComponent,
    ContainerComponent = _props$ContainerCompo === void 0 ? 'li' : _props$ContainerCompo,
    _props$ContainerProps = props.ContainerProps,
    _props$ContainerProps2 = _props$ContainerProps === void 0 ? {} : _props$ContainerProps,
    ContainerClassName = _props$ContainerProps2.className,
    ContainerProps = _objectWithoutProperties(_props$ContainerProps2, ["className"]),
    _props$dense = props.dense,
    dense = _props$dense === void 0 ? false : _props$dense,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    _props$disableGutters = props.disableGutters,
    disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
    _props$disablePadding = props.disablePadding,
    disablePadding = _props$disablePadding === void 0 ? false : _props$disablePadding,
    _props$divider = props.divider,
    divider = _props$divider === void 0 ? false : _props$divider,
    focusVisibleClassName = props.focusVisibleClassName,
    secondaryAction = props.secondaryAction,
    _props$selected = props.selected,
    selected = _props$selected === void 0 ? false : _props$selected,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    other = _objectWithoutProperties(props, ["alignItems", "autoFocus", "button", "children", "className", "component", "components", "componentsProps", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "disablePadding", "divider", "focusVisibleClassName", "secondaryAction", "selected", "slotProps", "slots"]);
  var context = React.useContext(ListContext);
  var childContext = React.useMemo(function () {
    return {
      dense: dense || context.dense || false,
      alignItems: alignItems,
      disableGutters: disableGutters
    };
  }, [alignItems, context.dense, dense, disableGutters]);
  var listItemRef = React.useRef(null);
  useEnhancedEffect(function () {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('MUI: Unable to set focus to a ListItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);
  var children = React.Children.toArray(childrenProp);

  // v4 implementation, deprecated in v5, will be removed in v6
  var hasSecondaryAction = children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);
  var ownerState = _extends({}, props, {
    alignItems: alignItems,
    autoFocus: autoFocus,
    button: button,
    dense: childContext.dense,
    disabled: disabled,
    disableGutters: disableGutters,
    disablePadding: disablePadding,
    divider: divider,
    hasSecondaryAction: hasSecondaryAction,
    selected: selected
  });
  var classes = useUtilityClasses(ownerState);
  var handleRef = useForkRef(listItemRef, ref);
  var Root = slots.root || components.Root || ListItemRoot;
  var rootProps = slotProps.root || componentsProps.root || {};
  var componentProps = _extends({
    className: clsx(classes.root, rootProps.className, className),
    disabled: disabled
  }, other);
  var Component = componentProp || 'li';
  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = clsx(listItemClasses.focusVisible, focusVisibleClassName);
    Component = ButtonBase;
  }

  // v4 implementation, deprecated in v5, will be removed in v6
  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component;

    // Avoid nesting of li > li.
    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div';
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div';
      }
    }
    return /*#__PURE__*/_jsx(ListContext.Provider, {
      value: childContext,
      children: /*#__PURE__*/_jsxs(ListItemContainer, _extends({
        as: ContainerComponent,
        className: clsx(classes.container, ContainerClassName),
        ref: handleRef,
        ownerState: ownerState
      }, ContainerProps, {
        children: [/*#__PURE__*/_jsx(Root, _extends({}, rootProps, !isHostComponent(Root) && {
          as: Component,
          ownerState: _extends({}, ownerState, rootProps.ownerState)
        }, componentProps, {
          children: children
        })), children.pop()]
      }))
    });
  }
  return /*#__PURE__*/_jsx(ListContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/_jsxs(Root, _extends({}, rootProps, {
      as: Component,
      ref: handleRef
    }, !isHostComponent(Root) && {
      ownerState: _extends({}, ownerState, rootProps.ownerState)
    }, componentProps, {
      children: [children, secondaryAction && /*#__PURE__*/_jsx(ListItemSecondaryAction, {
        children: secondaryAction
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" ? ListItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: PropTypes.oneOf(['center', 'flex-start']),
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, the list item is a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  button: PropTypes.bool,
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: chainPropTypes(PropTypes.node, function (props) {
    var children = React.Children.toArray(props.children);

    // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)
    var secondaryActionIndex = -1;
    for (var i = children.length - 1; i >= 0; i -= 1) {
      var child = children[i];
      if (isMuiElement(child, ['ListItemSecondaryAction'])) {
        secondaryActionIndex = i;
        break;
      }
    }

    //  is ListItemSecondaryAction the last child of ListItem
    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error('MUI: You used an element after ListItemSecondaryAction. ' + 'For ListItem to detect that it has a secondary action ' + 'you must pass it as the last child to ListItem.');
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.object
  }),
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated
   */
  ContainerComponent: elementTypeAcceptingRef,
  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated
   */
  ContainerProps: PropTypes.object,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: PropTypes.node,
  /**
   * Use to apply selected styling.
   * @default false
   * @deprecated checkout [ListItemButton](/material-ui/api/list-item-button/) instead
   */
  selected: PropTypes.bool,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default ListItem;