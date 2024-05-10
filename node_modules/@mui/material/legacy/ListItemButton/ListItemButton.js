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
import ButtonBase from '../ButtonBase';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';
import listItemButtonClasses, { getListItemButtonUtilityClass } from './listItemButtonClasses';
import { jsx as _jsx } from "react/jsx-runtime";
export var overridesResolver = function overridesResolver(props, styles) {
  var ownerState = props.ownerState;
  return [styles.root, ownerState.dense && styles.dense, ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters];
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var alignItems = ownerState.alignItems,
    classes = ownerState.classes,
    dense = ownerState.dense,
    disabled = ownerState.disabled,
    disableGutters = ownerState.disableGutters,
    divider = ownerState.divider,
    selected = ownerState.selected;
  var slots = {
    root: ['root', dense && 'dense', !disableGutters && 'gutters', divider && 'divider', disabled && 'disabled', alignItems === 'flex-start' && 'alignItemsFlexStart', selected && 'selected']
  };
  var composedClasses = composeClasses(slots, getListItemButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var ListItemButtonRoot = styled(ButtonBase, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return rootShouldForwardProp(prop) || prop === 'classes';
  },
  name: 'MuiListItemButton',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    minWidth: 0,
    boxSizing: 'border-box',
    textAlign: 'left',
    paddingTop: 8,
    paddingBottom: 8,
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
  }, "&.".concat(listItemButtonClasses.selected), _defineProperty({
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / ").concat(theme.vars.palette.action.selectedOpacity, ")") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
  }, "&.".concat(listItemButtonClasses.focusVisible), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.focusOpacity, "))") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  })), "&.".concat(listItemButtonClasses.selected, ":hover"), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.hoverOpacity, "))") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.primary.mainChannel, " / ").concat(theme.vars.palette.action.selectedOpacity, ")") : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }), "&.".concat(listItemButtonClasses.focusVisible), {
    backgroundColor: (theme.vars || theme).palette.action.focus
  }), "&.".concat(listItemButtonClasses.disabled), {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }), ownerState.divider && {
    borderBottom: "1px solid ".concat((theme.vars || theme).palette.divider),
    backgroundClip: 'padding-box'
  }, ownerState.alignItems === 'flex-start' && {
    alignItems: 'flex-start'
  }, !ownerState.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16
  }, ownerState.dense && {
    paddingTop: 4,
    paddingBottom: 4
  });
});
var ListItemButton = /*#__PURE__*/React.forwardRef(function ListItemButton(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListItemButton'
  });
  var _props$alignItems = props.alignItems,
    alignItems = _props$alignItems === void 0 ? 'center' : _props$alignItems,
    _props$autoFocus = props.autoFocus,
    autoFocus = _props$autoFocus === void 0 ? false : _props$autoFocus,
    _props$component = props.component,
    component = _props$component === void 0 ? 'div' : _props$component,
    children = props.children,
    _props$dense = props.dense,
    dense = _props$dense === void 0 ? false : _props$dense,
    _props$disableGutters = props.disableGutters,
    disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
    _props$divider = props.divider,
    divider = _props$divider === void 0 ? false : _props$divider,
    focusVisibleClassName = props.focusVisibleClassName,
    _props$selected = props.selected,
    selected = _props$selected === void 0 ? false : _props$selected,
    className = props.className,
    other = _objectWithoutProperties(props, ["alignItems", "autoFocus", "component", "children", "dense", "disableGutters", "divider", "focusVisibleClassName", "selected", "className"]);
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
        console.error('MUI: Unable to set focus to a ListItemButton whose component has not been rendered.');
      }
    }
  }, [autoFocus]);
  var ownerState = _extends({}, props, {
    alignItems: alignItems,
    dense: childContext.dense,
    disableGutters: disableGutters,
    divider: divider,
    selected: selected
  });
  var classes = useUtilityClasses(ownerState);
  var handleRef = useForkRef(listItemRef, ref);
  return /*#__PURE__*/_jsx(ListContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/_jsx(ListItemButtonRoot, _extends({
      ref: handleRef,
      href: other.href || other.to
      // `ButtonBase` processes `href` or `to` if `component` is set to 'button'
      ,
      component: (other.href || other.to) && component === 'div' ? 'button' : component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
      ownerState: ownerState,
      className: clsx(classes.root, className)
    }, other, {
      classes: classes,
      children: children
    }))
  });
});
process.env.NODE_ENV !== "production" ? ListItemButton.propTypes /* remove-proptypes */ = {
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
   */
  autoFocus: PropTypes.bool,
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
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
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
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
  href: PropTypes.string,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export default ListItemButton;