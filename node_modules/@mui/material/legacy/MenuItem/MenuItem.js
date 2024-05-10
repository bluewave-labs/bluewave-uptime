'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import styled, { rootShouldForwardProp } from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ListContext from '../List/ListContext';
import ButtonBase from '../ButtonBase';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import { dividerClasses } from '../Divider';
import { listItemIconClasses } from '../ListItemIcon';
import { listItemTextClasses } from '../ListItemText';
import menuItemClasses, { getMenuItemUtilityClass } from './menuItemClasses';
import { jsx as _jsx } from "react/jsx-runtime";
export var overridesResolver = function overridesResolver(props, styles) {
  var ownerState = props.ownerState;
  return [styles.root, ownerState.dense && styles.dense, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters];
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var disabled = ownerState.disabled,
    dense = ownerState.dense,
    divider = ownerState.divider,
    disableGutters = ownerState.disableGutters,
    selected = ownerState.selected,
    classes = ownerState.classes;
  var slots = {
    root: ['root', dense && 'dense', disabled && 'disabled', !disableGutters && 'gutters', divider && 'divider', selected && 'selected']
  };
  var composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return rootShouldForwardProp(prop) || prop === 'classes';
  },
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({}, theme.typography.body1, {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    minHeight: 48,
    paddingTop: 6,
    paddingBottom: 6,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap'
  }, !ownerState.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16
  }, ownerState.divider && {
    borderBottom: "1px solid ".concat((theme.vars || theme).palette.divider),
    backgroundClip: 'padding-box'
  }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }, "&.".concat(menuItemClasses.selected), _defineProperty({
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / ").concat(theme.vars.palette.action.selectedOpacity, ")") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
  }, "&.".concat(menuItemClasses.focusVisible), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.focusOpacity, "))") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  })), "&.".concat(menuItemClasses.selected, ":hover"), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.hoverOpacity, "))") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / ").concat(theme.vars.palette.action.selectedOpacity, ")") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }), "&.".concat(menuItemClasses.focusVisible), {
    backgroundColor: (theme.vars || theme).palette.action.focus
  }), "&.".concat(menuItemClasses.disabled), {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }), "& + .".concat(dividerClasses.root), {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }), "& + .".concat(dividerClasses.inset), {
    marginLeft: 52
  }), "& .".concat(listItemTextClasses.root), {
    marginTop: 0,
    marginBottom: 0
  }), "& .".concat(listItemTextClasses.inset), {
    paddingLeft: 36
  }), "& .".concat(listItemIconClasses.root), {
    minWidth: 36
  }), !ownerState.dense && _defineProperty({}, theme.breakpoints.up('sm'), {
    minHeight: 'auto'
  }), ownerState.dense && _extends({
    minHeight: 32,
    // https://m2.material.io/components/menus#specs > Dense
    paddingTop: 4,
    paddingBottom: 4
  }, theme.typography.body2, _defineProperty({}, "& .".concat(listItemIconClasses.root, " svg"), {
    fontSize: '1.25rem'
  })));
});
var MenuItem = /*#__PURE__*/React.forwardRef(function MenuItem(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiMenuItem'
  });
  var _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
    _props$component = props.component,
    component = _props$component === void 0 ? 'li' : _props$component,
    _props$dense = props.dense,
    dense = _props$dense === void 0 ? false : _props$dense,
    _props$divider = props.divider,
    divider = _props$divider === void 0 ? false : _props$divider,
    _props$disableGutters = props.disableGutters,
    disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
    focusVisibleClassName = props.focusVisibleClassName,
    _props$role = props.role,
    role = _props$role === void 0 ? 'menuitem' : _props$role,
    tabIndexProp = props.tabIndex,
    className = props.className,
    other = _objectWithoutProperties(props, ["autoFocus", "component", "dense", "divider", "disableGutters", "focusVisibleClassName", "role", "tabIndex", "className"]);
  var context = React.useContext(ListContext);
  var childContext = React.useMemo(function () {
    return {
      dense: dense || context.dense || false,
      disableGutters: disableGutters
    };
  }, [context.dense, dense, disableGutters]);
  var menuItemRef = React.useRef(null);
  useEnhancedEffect(function () {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('MUI: Unable to set focus to a MenuItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);
  var ownerState = _extends({}, props, {
    dense: childContext.dense,
    divider: divider,
    disableGutters: disableGutters
  });
  var classes = useUtilityClasses(props);
  var handleRef = useForkRef(menuItemRef, ref);
  var tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }
  return /*#__PURE__*/_jsx(ListContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/_jsx(MenuItemRoot, _extends({
      ref: handleRef,
      role: role,
      tabIndex: tabIndex,
      component: component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
      className: clsx(classes.root, className)
    }, other, {
      ownerState: ownerState,
      classes: classes
    }))
  });
});
process.env.NODE_ENV !== "production" ? MenuItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
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
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  /**
   * If `true`, the component is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number
} : void 0;
export default MenuItem;