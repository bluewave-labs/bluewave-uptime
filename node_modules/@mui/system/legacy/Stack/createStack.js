import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import deepmerge from '@mui/utils/deepmerge';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import composeClasses from '@mui/utils/composeClasses';
import systemStyled from '../styled';
import useThemePropsSystem from '../useThemeProps';
import { extendSxProp } from '../styleFunctionSx';
import createTheme from '../createTheme';
import { handleBreakpoints, mergeBreakpointsInOrder, resolveBreakpointValues } from '../breakpoints';
import { createUnarySpacing, getValue } from '../spacing';
import { jsx as _jsx } from "react/jsx-runtime";
var defaultTheme = createTheme();
// widening Theme to any so that the consumer can own the theme structure.
var defaultCreateStyledComponent = systemStyled('div', {
  name: 'MuiStack',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
});
function useThemePropsDefault(props) {
  return useThemePropsSystem({
    props: props,
    name: 'MuiStack',
    defaultTheme: defaultTheme
  });
}

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */
function joinChildren(children, separator) {
  var childrenArray = React.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce(function (output, child, index) {
    output.push(child);
    if (index < childrenArray.length - 1) {
      output.push( /*#__PURE__*/React.cloneElement(separator, {
        key: "separator-".concat(index)
      }));
    }
    return output;
  }, []);
}
var getSideFromDirection = function getSideFromDirection(direction) {
  return {
    row: 'Left',
    'row-reverse': 'Right',
    column: 'Top',
    'column-reverse': 'Bottom'
  }[direction];
};
export var style = function style(_ref) {
  var ownerState = _ref.ownerState,
    theme = _ref.theme;
  var styles = _extends({
    display: 'flex',
    flexDirection: 'column'
  }, handleBreakpoints({
    theme: theme
  }, resolveBreakpointValues({
    values: ownerState.direction,
    breakpoints: theme.breakpoints.values
  }), function (propValue) {
    return {
      flexDirection: propValue
    };
  }));
  if (ownerState.spacing) {
    var transformer = createUnarySpacing(theme);
    var base = Object.keys(theme.breakpoints.values).reduce(function (acc, breakpoint) {
      if (_typeof(ownerState.spacing) === 'object' && ownerState.spacing[breakpoint] != null || _typeof(ownerState.direction) === 'object' && ownerState.direction[breakpoint] != null) {
        acc[breakpoint] = true;
      }
      return acc;
    }, {});
    var directionValues = resolveBreakpointValues({
      values: ownerState.direction,
      base: base
    });
    var spacingValues = resolveBreakpointValues({
      values: ownerState.spacing,
      base: base
    });
    if (_typeof(directionValues) === 'object') {
      Object.keys(directionValues).forEach(function (breakpoint, index, breakpoints) {
        var directionValue = directionValues[breakpoint];
        if (!directionValue) {
          var previousDirectionValue = index > 0 ? directionValues[breakpoints[index - 1]] : 'column';
          directionValues[breakpoint] = previousDirectionValue;
        }
      });
    }
    var styleFromPropValue = function styleFromPropValue(propValue, breakpoint) {
      if (ownerState.useFlexGap) {
        return {
          gap: getValue(transformer, propValue)
        };
      }
      return {
        // The useFlexGap={false} implement relies on each child to give up control of the margin.
        // We need to reset the margin to avoid double spacing.
        '& > :not(style):not(style)': {
          margin: 0
        },
        '& > :not(style) ~ :not(style)': _defineProperty({}, "margin".concat(getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)), getValue(transformer, propValue))
      };
    };
    styles = deepmerge(styles, handleBreakpoints({
      theme: theme
    }, spacingValues, styleFromPropValue));
  }
  styles = mergeBreakpointsInOrder(theme.breakpoints, styles);
  return styles;
};
export default function createStack() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$createStyled = options.createStyledComponent,
    createStyledComponent = _options$createStyled === void 0 ? defaultCreateStyledComponent : _options$createStyled,
    _options$useThemeProp = options.useThemeProps,
    useThemeProps = _options$useThemeProp === void 0 ? useThemePropsDefault : _options$useThemeProp,
    _options$componentNam = options.componentName,
    componentName = _options$componentNam === void 0 ? 'MuiStack' : _options$componentNam;
  var useUtilityClasses = function useUtilityClasses() {
    var slots = {
      root: ['root']
    };
    return composeClasses(slots, function (slot) {
      return generateUtilityClass(componentName, slot);
    }, {});
  };
  var StackRoot = createStyledComponent(style);
  var Stack = /*#__PURE__*/React.forwardRef(function Grid(inProps, ref) {
    var themeProps = useThemeProps(inProps);
    var props = extendSxProp(themeProps); // `color` type conflicts with html color attribute.
    var _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'column' : _props$direction,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 0 : _props$spacing,
      divider = props.divider,
      children = props.children,
      className = props.className,
      _props$useFlexGap = props.useFlexGap,
      useFlexGap = _props$useFlexGap === void 0 ? false : _props$useFlexGap,
      other = _objectWithoutProperties(props, ["component", "direction", "spacing", "divider", "children", "className", "useFlexGap"]);
    var ownerState = {
      direction: direction,
      spacing: spacing,
      useFlexGap: useFlexGap
    };
    var classes = useUtilityClasses();
    return /*#__PURE__*/_jsx(StackRoot, _extends({
      as: component,
      ownerState: ownerState,
      ref: ref,
      className: clsx(classes.root, className)
    }, other, {
      children: divider ? joinChildren(children, divider) : children
    }));
  });
  process.env.NODE_ENV !== "production" ? Stack.propTypes /* remove-proptypes */ = {
    children: PropTypes.node,
    direction: PropTypes.oneOfType([PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), PropTypes.object]),
    divider: PropTypes.node,
    spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),
    sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
  } : void 0;
  return Stack;
}