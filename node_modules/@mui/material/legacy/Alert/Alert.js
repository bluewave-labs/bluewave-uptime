'use client';

import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { darken, lighten } from '@mui/system/colorManipulator';
import { styled, createUseThemeProps } from '../zero-styled';
import useSlot from '../utils/useSlot';
import capitalize from '../utils/capitalize';
import Paper from '../Paper';
import alertClasses, { getAlertUtilityClass } from './alertClasses';
import IconButton from '../IconButton';
import SuccessOutlinedIcon from '../internal/svg-icons/SuccessOutlined';
import ReportProblemOutlinedIcon from '../internal/svg-icons/ReportProblemOutlined';
import ErrorOutlineIcon from '../internal/svg-icons/ErrorOutline';
import InfoOutlinedIcon from '../internal/svg-icons/InfoOutlined';
import CloseIcon from '../internal/svg-icons/Close';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useThemeProps = createUseThemeProps('MuiAlert');
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var variant = ownerState.variant,
    color = ownerState.color,
    severity = ownerState.severity,
    classes = ownerState.classes;
  var slots = {
    root: ['root', "color".concat(capitalize(color || severity)), "".concat(variant).concat(capitalize(color || severity)), "".concat(variant)],
    icon: ['icon'],
    message: ['message'],
    action: ['action']
  };
  return composeClasses(slots, getAlertUtilityClass, classes);
};
var AlertRoot = styled(Paper, {
  name: 'MuiAlert',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, styles[ownerState.variant], styles["".concat(ownerState.variant).concat(capitalize(ownerState.color || ownerState.severity))]];
  }
})(function (_ref) {
  var theme = _ref.theme;
  var getColor = theme.palette.mode === 'light' ? darken : lighten;
  var getBackgroundColor = theme.palette.mode === 'light' ? lighten : darken;
  return _extends({}, theme.typography.body2, {
    backgroundColor: 'transparent',
    display: 'flex',
    padding: '6px 16px',
    variants: [].concat(_toConsumableArray(Object.entries(theme.palette).filter(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        value = _ref3[1];
      return value.main && value.light;
    }).map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 1),
        color = _ref5[0];
      return {
        props: {
          colorSeverity: color,
          variant: 'standard'
        },
        style: _defineProperty({
          color: theme.vars ? theme.vars.palette.Alert["".concat(color, "Color")] : getColor(theme.palette[color].light, 0.6),
          backgroundColor: theme.vars ? theme.vars.palette.Alert["".concat(color, "StandardBg")] : getBackgroundColor(theme.palette[color].light, 0.9)
        }, "& .".concat(alertClasses.icon), theme.vars ? {
          color: theme.vars.palette.Alert["".concat(color, "IconColor")]
        } : {
          color: theme.palette[color].main
        })
      };
    })), _toConsumableArray(Object.entries(theme.palette).filter(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
        value = _ref7[1];
      return value.main && value.light;
    }).map(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 1),
        color = _ref9[0];
      return {
        props: {
          colorSeverity: color,
          variant: 'outlined'
        },
        style: _defineProperty({
          color: theme.vars ? theme.vars.palette.Alert["".concat(color, "Color")] : getColor(theme.palette[color].light, 0.6),
          border: "1px solid ".concat((theme.vars || theme).palette[color].light)
        }, "& .".concat(alertClasses.icon), theme.vars ? {
          color: theme.vars.palette.Alert["".concat(color, "IconColor")]
        } : {
          color: theme.palette[color].main
        })
      };
    })), _toConsumableArray(Object.entries(theme.palette).filter(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
        value = _ref11[1];
      return value.main && value.dark;
    }).map(function (_ref12) {
      var _ref13 = _slicedToArray(_ref12, 1),
        color = _ref13[0];
      return {
        props: {
          colorSeverity: color,
          variant: 'filled'
        },
        style: _extends({
          fontWeight: theme.typography.fontWeightMedium
        }, theme.vars ? {
          color: theme.vars.palette.Alert["".concat(color, "FilledColor")],
          backgroundColor: theme.vars.palette.Alert["".concat(color, "FilledBg")]
        } : {
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette[color].dark : theme.palette[color].main,
          color: theme.palette.getContrastText(theme.palette[color].main)
        })
      };
    })))
  });
});
var AlertIcon = styled('div', {
  name: 'MuiAlert',
  slot: 'Icon',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.icon;
  }
})({
  marginRight: 12,
  padding: '7px 0',
  display: 'flex',
  fontSize: 22,
  opacity: 0.9
});
var AlertMessage = styled('div', {
  name: 'MuiAlert',
  slot: 'Message',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.message;
  }
})({
  padding: '8px 0',
  minWidth: 0,
  overflow: 'auto'
});
var AlertAction = styled('div', {
  name: 'MuiAlert',
  slot: 'Action',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.action;
  }
})({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '4px 0 0 16px',
  marginLeft: 'auto',
  marginRight: -8
});
var defaultIconMapping = {
  success: /*#__PURE__*/_jsx(SuccessOutlinedIcon, {
    fontSize: "inherit"
  }),
  warning: /*#__PURE__*/_jsx(ReportProblemOutlinedIcon, {
    fontSize: "inherit"
  }),
  error: /*#__PURE__*/_jsx(ErrorOutlineIcon, {
    fontSize: "inherit"
  }),
  info: /*#__PURE__*/_jsx(InfoOutlinedIcon, {
    fontSize: "inherit"
  })
};
var Alert = /*#__PURE__*/React.forwardRef(function Alert(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAlert'
  });
  var action = props.action,
    children = props.children,
    className = props.className,
    _props$closeText = props.closeText,
    closeText = _props$closeText === void 0 ? 'Close' : _props$closeText,
    color = props.color,
    _props$components = props.components,
    components = _props$components === void 0 ? {} : _props$components,
    _props$componentsProp = props.componentsProps,
    componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
    icon = props.icon,
    _props$iconMapping = props.iconMapping,
    iconMapping = _props$iconMapping === void 0 ? defaultIconMapping : _props$iconMapping,
    onClose = props.onClose,
    _props$role = props.role,
    role = _props$role === void 0 ? 'alert' : _props$role,
    _props$severity = props.severity,
    severity = _props$severity === void 0 ? 'success' : _props$severity,
    _props$slotProps = props.slotProps,
    slotProps = _props$slotProps === void 0 ? {} : _props$slotProps,
    _props$slots = props.slots,
    slots = _props$slots === void 0 ? {} : _props$slots,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'standard' : _props$variant,
    other = _objectWithoutProperties(props, ["action", "children", "className", "closeText", "color", "components", "componentsProps", "icon", "iconMapping", "onClose", "role", "severity", "slotProps", "slots", "variant"]);
  var ownerState = _extends({}, props, {
    color: color,
    severity: severity,
    variant: variant,
    colorSeverity: color || severity
  });
  var classes = useUtilityClasses(ownerState);
  var externalForwardedProps = {
    slots: _extends({
      closeButton: components.CloseButton,
      closeIcon: components.CloseIcon
    }, slots),
    slotProps: _extends({}, componentsProps, slotProps)
  };
  var _useSlot = useSlot('closeButton', {
      elementType: IconButton,
      externalForwardedProps: externalForwardedProps,
      ownerState: ownerState
    }),
    _useSlot2 = _slicedToArray(_useSlot, 2),
    CloseButtonSlot = _useSlot2[0],
    closeButtonProps = _useSlot2[1];
  var _useSlot3 = useSlot('closeIcon', {
      elementType: CloseIcon,
      externalForwardedProps: externalForwardedProps,
      ownerState: ownerState
    }),
    _useSlot4 = _slicedToArray(_useSlot3, 2),
    CloseIconSlot = _useSlot4[0],
    closeIconProps = _useSlot4[1];
  return /*#__PURE__*/_jsxs(AlertRoot, _extends({
    role: role,
    elevation: 0,
    ownerState: ownerState,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: [icon !== false ? /*#__PURE__*/_jsx(AlertIcon, {
      ownerState: ownerState,
      className: classes.icon,
      children: icon || iconMapping[severity] || defaultIconMapping[severity]
    }) : null, /*#__PURE__*/_jsx(AlertMessage, {
      ownerState: ownerState,
      className: classes.message,
      children: children
    }), action != null ? /*#__PURE__*/_jsx(AlertAction, {
      ownerState: ownerState,
      className: classes.action,
      children: action
    }) : null, action == null && onClose ? /*#__PURE__*/_jsx(AlertAction, {
      ownerState: ownerState,
      className: classes.action,
      children: /*#__PURE__*/_jsx(CloseButtonSlot, _extends({
        size: "small",
        "aria-label": closeText,
        title: closeText,
        color: "inherit",
        onClick: onClose
      }, closeButtonProps, {
        children: /*#__PURE__*/_jsx(CloseIconSlot, _extends({
          fontSize: "small"
        }, closeIconProps))
      }))
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? Alert.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: PropTypes.node,
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
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   *
   * @default {}
   */
  components: PropTypes.shape({
    CloseButton: PropTypes.elementType,
    CloseIcon: PropTypes.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. [How to migrate](/material-ui/migration/migrating-from-deprecated-apis/).
   *
   * @default {}
   */
  componentsProps: PropTypes.shape({
    closeButton: PropTypes.object,
    closeIcon: PropTypes.object
  }),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
   */
  icon: PropTypes.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: PropTypes.shape({
    error: PropTypes.node,
    info: PropTypes.node,
    success: PropTypes.node,
    warning: PropTypes.node
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    closeButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    closeIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    closeButton: PropTypes.elementType,
    closeIcon: PropTypes.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['filled', 'outlined', 'standard']), PropTypes.string])
} : void 0;
export default Alert;