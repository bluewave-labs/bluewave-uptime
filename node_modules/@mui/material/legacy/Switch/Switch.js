'use client';

// @inheritedComponent IconButton
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import { alpha, darken, lighten } from '@mui/system/colorManipulator';
import capitalize from '../utils/capitalize';
import SwitchBase from '../internal/SwitchBase';
import { styled, createUseThemeProps } from '../zero-styled';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var useThemeProps = createUseThemeProps('MuiSwitch');
var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes,
    edge = ownerState.edge,
    size = ownerState.size,
    color = ownerState.color,
    checked = ownerState.checked,
    disabled = ownerState.disabled;
  var slots = {
    root: ['root', edge && "edge".concat(capitalize(edge)), "size".concat(capitalize(size))],
    switchBase: ['switchBase', "color".concat(capitalize(color)), checked && 'checked', disabled && 'disabled'],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input']
  };
  var composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.root, ownerState.edge && styles["edge".concat(capitalize(ownerState.edge))], styles["size".concat(capitalize(ownerState.size))]];
  }
})({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0,
  // Reset the stacking context.
  verticalAlign: 'middle',
  // For correct alignment with the text.
  '@media print': {
    colorAdjust: 'exact'
  },
  variants: [{
    props: {
      edge: 'start'
    },
    style: {
      marginLeft: -8
    }
  }, {
    props: {
      edge: 'end'
    },
    style: {
      marginRight: -8
    }
  }, {
    props: {
      size: 'small'
    },
    style: _defineProperty(_defineProperty({
      width: 40,
      height: 24,
      padding: 7
    }, "& .".concat(switchClasses.thumb), {
      width: 16,
      height: 16
    }), "& .".concat(switchClasses.switchBase), _defineProperty({
      padding: 4
    }, "&.".concat(switchClasses.checked), {
      transform: 'translateX(16px)'
    }))
  }]
});
var SwitchSwitchBase = styled(SwitchBase, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.switchBase, _defineProperty({}, "& .".concat(switchClasses.input), styles.input), ownerState.color !== 'default' && styles["color".concat(capitalize(ownerState.color))]];
  }
})(function (_ref2) {
  var theme = _ref2.theme;
  return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    // Render above the focus ripple.
    color: theme.vars ? theme.vars.palette.Switch.defaultColor : "".concat(theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300]),
    transition: theme.transitions.create(['left', 'transform'], {
      duration: theme.transitions.duration.shortest
    })
  }, "&.".concat(switchClasses.checked), {
    transform: 'translateX(20px)'
  }), "&.".concat(switchClasses.disabled), {
    color: theme.vars ? theme.vars.palette.Switch.defaultDisabledColor : "".concat(theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600])
  }), "&.".concat(switchClasses.checked, " + .").concat(switchClasses.track), {
    opacity: 0.5
  }), "&.".concat(switchClasses.disabled, " + .").concat(switchClasses.track), {
    opacity: theme.vars ? theme.vars.opacity.switchTrackDisabled : "".concat(theme.palette.mode === 'light' ? 0.12 : 0.2)
  }), "& .".concat(switchClasses.input), {
    left: '-100%',
    width: '300%'
  });
}, function (_ref4) {
  var theme = _ref4.theme;
  return {
    '&:hover': {
      backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette.action.activeChannel, " / ").concat(theme.vars.palette.action.hoverOpacity, ")") : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    variants: _toConsumableArray(Object.entries(theme.palette).filter(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
        value = _ref6[1];
      return value.main && value.light;
    }) // check all the used fields in the style below
    .map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 1),
        color = _ref8[0];
      return {
        props: {
          color: color
        },
        style: _defineProperty(_defineProperty({}, "&.".concat(switchClasses.checked), _defineProperty({
          color: (theme.vars || theme).palette[color].main,
          '&:hover': {
            backgroundColor: theme.vars ? "rgba(".concat(theme.vars.palette[color].mainChannel, " / ").concat(theme.vars.palette.action.hoverOpacity, ")") : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
            '@media (hover: none)': {
              backgroundColor: 'transparent'
            }
          }
        }, "&.".concat(switchClasses.disabled), {
          color: theme.vars ? theme.vars.palette.Switch["".concat(color, "DisabledColor")] : "".concat(theme.palette.mode === 'light' ? lighten(theme.palette[color].main, 0.62) : darken(theme.palette[color].main, 0.55))
        })), "&.".concat(switchClasses.checked, " + .").concat(switchClasses.track), {
          backgroundColor: (theme.vars || theme).palette[color].main
        })
      };
    }))
  };
});
var SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.track;
  }
})(function (_ref9) {
  var theme = _ref9.theme;
  return {
    height: '100%',
    width: '100%',
    borderRadius: 14 / 2,
    zIndex: -1,
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest
    }),
    backgroundColor: theme.vars ? theme.vars.palette.common.onBackground : "".concat(theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white),
    opacity: theme.vars ? theme.vars.opacity.switchTrack : "".concat(theme.palette.mode === 'light' ? 0.38 : 0.3)
  };
});
var SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.thumb;
  }
})(function (_ref10) {
  var theme = _ref10.theme;
  return {
    boxShadow: (theme.vars || theme).shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%'
  };
});
var Switch = /*#__PURE__*/React.forwardRef(function Switch(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSwitch'
  });
  var className = props.className,
    _props$color = props.color,
    color = _props$color === void 0 ? 'primary' : _props$color,
    _props$edge = props.edge,
    edge = _props$edge === void 0 ? false : _props$edge,
    _props$size = props.size,
    size = _props$size === void 0 ? 'medium' : _props$size,
    sx = props.sx,
    other = _objectWithoutProperties(props, ["className", "color", "edge", "size", "sx"]);
  var ownerState = _extends({}, props, {
    color: color,
    edge: edge,
    size: size
  });
  var classes = useUtilityClasses(ownerState);
  var icon = /*#__PURE__*/_jsx(SwitchThumb, {
    className: classes.thumb,
    ownerState: ownerState
  });
  return /*#__PURE__*/_jsxs(SwitchRoot, {
    className: clsx(classes.root, className),
    sx: sx,
    ownerState: ownerState,
    children: [/*#__PURE__*/_jsx(SwitchSwitchBase, _extends({
      type: "checkbox",
      icon: icon,
      checkedIcon: icon,
      ref: ref,
      ownerState: ownerState
    }, other, {
      classes: _extends({}, classes, {
        root: classes.switchBase
      })
    })), /*#__PURE__*/_jsx(SwitchTrack, {
      className: classes.track,
      ownerState: ownerState
    })]
  });
});
process.env.NODE_ENV !== "production" ? Switch.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), PropTypes.string]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any
} : void 0;
export default Switch;