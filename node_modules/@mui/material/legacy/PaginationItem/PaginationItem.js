'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import { useRtl } from '@mui/system/RtlProvider';
import useThemeProps from '../styles/useThemeProps';
import paginationItemClasses, { getPaginationItemUtilityClass } from './paginationItemClasses';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import FirstPageIcon from '../internal/svg-icons/FirstPage';
import LastPageIcon from '../internal/svg-icons/LastPage';
import NavigateBeforeIcon from '../internal/svg-icons/NavigateBefore';
import NavigateNextIcon from '../internal/svg-icons/NavigateNext';
import styled from '../styles/styled';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var overridesResolver = function overridesResolver(props, styles) {
  var ownerState = props.ownerState;
  return [styles.root, styles[ownerState.variant], styles["size".concat(capitalize(ownerState.size))], ownerState.variant === 'text' && styles["text".concat(capitalize(ownerState.color))], ownerState.variant === 'outlined' && styles["outlined".concat(capitalize(ownerState.color))], ownerState.shape === 'rounded' && styles.rounded, ownerState.type === 'page' && styles.page, (ownerState.type === 'start-ellipsis' || ownerState.type === 'end-ellipsis') && styles.ellipsis, (ownerState.type === 'previous' || ownerState.type === 'next') && styles.previousNext, (ownerState.type === 'first' || ownerState.type === 'last') && styles.firstLast];
};
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    color = ownerState.color,
    disabled = ownerState.disabled,
    selected = ownerState.selected,
    size = ownerState.size,
    shape = ownerState.shape,
    type = ownerState.type,
    variant = ownerState.variant;
  var slots = {
    root: ['root', "size".concat(capitalize(size)), variant, shape, color !== 'standard' && "color".concat(capitalize(color)), color !== 'standard' && "".concat(variant).concat(capitalize(color)), disabled && 'disabled', selected && 'selected', {
      page: 'page',
      first: 'firstLast',
      last: 'firstLast',
      'start-ellipsis': 'ellipsis',
      'end-ellipsis': 'ellipsis',
      previous: 'previousNext',
      next: 'previousNext'
    }[type]],
    icon: ['icon']
  };
  return composeClasses(slots, getPaginationItemUtilityClass, classes);
};
var PaginationItemEllipsis = styled('div', {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  return _extends({}, theme.typography.body2, _defineProperty({
    borderRadius: 32 / 2,
    textAlign: 'center',
    boxSizing: 'border-box',
    minWidth: 32,
    padding: '0 6px',
    margin: '0 3px',
    color: (theme.vars || theme).palette.text.primary,
    height: 'auto'
  }, "&.".concat(paginationItemClasses.disabled), {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }), ownerState.size === 'small' && {
    minWidth: 26,
    borderRadius: 26 / 2,
    margin: '0 1px',
    padding: '0 4px'
  }, ownerState.size === 'large' && {
    minWidth: 40,
    borderRadius: 40 / 2,
    padding: '0 10px',
    fontSize: theme.typography.pxToRem(15)
  });
});
var PaginationItemPage = styled(ButtonBase, {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref2) {
  var theme = _ref2.theme,
    ownerState = _ref2.ownerState;
  return _extends({}, theme.typography.body2, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    borderRadius: 32 / 2,
    textAlign: 'center',
    boxSizing: 'border-box',
    minWidth: 32,
    height: 32,
    padding: '0 6px',
    margin: '0 3px',
    color: (theme.vars || theme).palette.text.primary
  }, "&.".concat(paginationItemClasses.focusVisible), {
    backgroundColor: (theme.vars || theme).palette.action.focus
  }), "&.".concat(paginationItemClasses.disabled), {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  }), "transition", theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.short
  })), '&:hover', {
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }), "&.".concat(paginationItemClasses.selected), _defineProperty(_defineProperty({
    backgroundColor: (theme.vars || theme).palette.action.selected,
    '&:hover': {
      backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.action.selectedChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.hoverOpacity, "))") : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette.action.selected
      }
    }
  }, "&.".concat(paginationItemClasses.focusVisible), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.action.selectedChannel, " / calc(").concat(theme.vars.palette.action.selectedOpacity, " + ").concat(theme.vars.palette.action.focusOpacity, "))") : alpha(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  }), "&.".concat(paginationItemClasses.disabled), {
    opacity: 1,
    color: (theme.vars || theme).palette.action.disabled,
    backgroundColor: (theme.vars || theme).palette.action.selected
  })), ownerState.size === 'small' && {
    minWidth: 26,
    height: 26,
    borderRadius: 26 / 2,
    margin: '0 1px',
    padding: '0 4px'
  }, ownerState.size === 'large' && {
    minWidth: 40,
    height: 40,
    borderRadius: 40 / 2,
    padding: '0 10px',
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.shape === 'rounded' && {
    borderRadius: (theme.vars || theme).shape.borderRadius
  });
}, function (_ref3) {
  var theme = _ref3.theme,
    ownerState = _ref3.ownerState;
  return _extends({}, ownerState.variant === 'text' && _defineProperty({}, "&.".concat(paginationItemClasses.selected), _extends({}, ownerState.color !== 'standard' && _defineProperty({
    color: (theme.vars || theme).palette[ownerState.color].contrastText,
    backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main
      }
    }
  }, "&.".concat(paginationItemClasses.focusVisible), {
    backgroundColor: (theme.vars || theme).palette[ownerState.color].dark
  }), _defineProperty({}, "&.".concat(paginationItemClasses.disabled), {
    color: (theme.vars || theme).palette.action.disabled
  }))), ownerState.variant === 'outlined' && _defineProperty({
    border: theme.vars ? "1px solid rgba(".concat(theme.vars.palette.common.onBackgroundChannel, " / 0.23)") : "1px solid ".concat(theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)')
  }, "&.".concat(paginationItemClasses.selected), _extends({}, ownerState.color !== 'standard' && _defineProperty({
    color: (theme.vars || theme).palette[ownerState.color].main,
    border: "1px solid ".concat(theme.vars ? "rgba(".concat(theme.vars.palette[ownerState.color].mainChannel, " / 0.5)") : alpha(theme.palette[ownerState.color].main, 0.5)),
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette[ownerState.color].mainChannel, " / ").concat(theme.vars.palette.action.activatedOpacity, ")") : alpha(theme.palette[ownerState.color].main, theme.palette.action.activatedOpacity),
    '&:hover': {
      backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette[ownerState.color].mainChannel, " / calc(").concat(theme.vars.palette.action.activatedOpacity, " + ").concat(theme.vars.palette.action.focusOpacity, "))") : alpha(theme.palette[ownerState.color].main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }, "&.".concat(paginationItemClasses.focusVisible), {
    backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette[ownerState.color].mainChannel, " / calc(").concat(theme.vars.palette.action.activatedOpacity, " + ").concat(theme.vars.palette.action.focusOpacity, "))") : alpha(theme.palette[ownerState.color].main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity)
  }), _defineProperty({}, "&.".concat(paginationItemClasses.disabled), {
    borderColor: (theme.vars || theme).palette.action.disabledBackground,
    color: (theme.vars || theme).palette.action.disabled
  }))));
});
var PaginationItemPageIcon = styled('div', {
  name: 'MuiPaginationItem',
  slot: 'Icon',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.icon;
  }
})(function (_ref8) {
  var theme = _ref8.theme,
    ownerState = _ref8.ownerState;
  return _extends({
    fontSize: theme.typography.pxToRem(20),
    margin: '0 -8px'
  }, ownerState.size === 'small' && {
    fontSize: theme.typography.pxToRem(18)
  }, ownerState.size === 'large' && {
    fontSize: theme.typography.pxToRem(22)
  });
});
var PaginationItem = /*#__PURE__*/React.forwardRef(function PaginationItem(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPaginationItem'
  });
  var className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? 'standard' : _props$color,
    component = props.component,
    _props$components = props.components,
    components = _props$components === void 0 ? {} : _props$components,
    _props$disabled = props.disabled,
    disabled = _props$disabled === void 0 ? false : _props$disabled,
    page = props.page,
    _props$selected = props.selected,
    selected = _props$selected === void 0 ? false : _props$selected,
    _props$shape = props.shape,
    shape = _props$shape === void 0 ? 'circular' : _props$shape,
    _props$size = props.size,
    size = _props$size === void 0 ? 'medium' : _props$size,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$type = props.type,
    type = _props$type === void 0 ? 'page' : _props$type,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'text' : _props$variant,
    other = _objectWithoutProperties(props, ["className", "color", "component", "components", "disabled", "page", "selected", "shape", "size", "slots", "type", "variant"]);
  var ownerState = _extends({}, props, {
    color: color,
    disabled: disabled,
    selected: selected,
    shape: shape,
    size: size,
    type: type,
    variant: variant
  });
  var isRtl = useRtl();
  var classes = useUtilityClasses(ownerState);
  var normalizedIcons = isRtl ? {
    previous: slots.next || components.next || NavigateNextIcon,
    next: slots.previous || components.previous || NavigateBeforeIcon,
    last: slots.first || components.first || FirstPageIcon,
    first: slots.last || components.last || LastPageIcon
  } : {
    previous: slots.previous || components.previous || NavigateBeforeIcon,
    next: slots.next || components.next || NavigateNextIcon,
    first: slots.first || components.first || FirstPageIcon,
    last: slots.last || components.last || LastPageIcon
  };
  var Icon = normalizedIcons[type];
  return type === 'start-ellipsis' || type === 'end-ellipsis' ? /*#__PURE__*/_jsx(PaginationItemEllipsis, {
    ref: ref,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    children: "\u2026"
  }) : /*#__PURE__*/_jsxs(PaginationItemPage, _extends({
    ref: ref,
    ownerState: ownerState,
    component: component,
    disabled: disabled,
    className: clsx(classes.root, className)
  }, other, {
    children: [type === 'page' && page, Icon ? /*#__PURE__*/_jsx(PaginationItemPageIcon, {
      as: Icon,
      ownerState: ownerState,
      className: classes.icon
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? PaginationItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
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
   * The active color.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['primary', 'secondary', 'standard']), PropTypes.string]),
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
    first: PropTypes.elementType,
    last: PropTypes.elementType,
    next: PropTypes.elementType,
    previous: PropTypes.elementType
  }),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The current page number.
   */
  page: PropTypes.node,
  /**
   * If `true` the pagination item is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The shape of the pagination item.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    first: PropTypes.elementType,
    last: PropTypes.elementType,
    next: PropTypes.elementType,
    previous: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The type of pagination item.
   * @default 'page'
   */
  type: PropTypes.oneOf(['end-ellipsis', 'first', 'last', 'next', 'page', 'previous', 'start-ellipsis']),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['outlined', 'text']), PropTypes.string])
} : void 0;
export default PaginationItem;