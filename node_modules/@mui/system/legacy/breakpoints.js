import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import PropTypes from 'prop-types';
import deepmerge from '@mui/utils/deepmerge';
import merge from './merge';

// The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.
export var values = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536 // large screen
};
var defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: function up(key) {
    return "@media (min-width:".concat(values[key], "px)");
  }
};
export function handleBreakpoints(props, propValue, styleFromPropValue) {
  var theme = props.theme || {};
  if (Array.isArray(propValue)) {
    var themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce(function (acc, item, index) {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (_typeof(propValue) === 'object') {
    var _themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce(function (acc, breakpoint) {
      // key is breakpoint
      if (Object.keys(_themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        var mediaKey = _themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        var cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  var output = styleFromPropValue(propValue);
  return output;
}
function breakpoints(styleFunction) {
  // false positive
  // eslint-disable-next-line react/function-component-definition
  var newStyleFunction = function newStyleFunction(props) {
    var theme = props.theme || {};
    var base = styleFunction(props);
    var themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    var extended = themeBreakpoints.keys.reduce(function (acc, key) {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = styleFunction(_extends({
          theme: theme
        }, props[key]));
      }
      return acc;
    }, null);
    return merge(base, extended);
  };
  newStyleFunction.propTypes = process.env.NODE_ENV !== 'production' ? _extends({}, styleFunction.propTypes, {
    xs: PropTypes.object,
    sm: PropTypes.object,
    md: PropTypes.object,
    lg: PropTypes.object,
    xl: PropTypes.object
  }) : {};
  newStyleFunction.filterProps = ['xs', 'sm', 'md', 'lg', 'xl'].concat(_toConsumableArray(styleFunction.filterProps));
  return newStyleFunction;
}
export function createEmptyBreakpointObject() {
  var _breakpointsInput$key;
  var breakpointsInput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce(function (acc, key) {
    var breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
export function removeUnusedBreakpoints(breakpointKeys, style) {
  return breakpointKeys.reduce(function (acc, key) {
    var breakpointOutput = acc[key];
    var isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style);
}
export function mergeBreakpointsInOrder(breakpointsInput) {
  var emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);
  for (var _len = arguments.length, styles = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    styles[_key - 1] = arguments[_key];
  }
  var mergedOutput = [emptyBreakpoints].concat(styles).reduce(function (prev, next) {
    return deepmerge(prev, next);
  }, {});
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}

// compute base for responsive values; e.g.,
// [1,2,3] => {xs: true, sm: true, md: true}
// {xs: 1, sm: 2, md: 3} => {xs: true, sm: true, md: true}
export function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
  // fixed value
  if (_typeof(breakpointValues) !== 'object') {
    return {};
  }
  var base = {};
  var breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach(function (breakpoint, i) {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach(function (breakpoint) {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}
export function resolveBreakpointValues(_ref) {
  var breakpointValues = _ref.values,
    themeBreakpoints = _ref.breakpoints,
    customBase = _ref.base;
  var base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  var keys = Object.keys(base);
  if (keys.length === 0) {
    return breakpointValues;
  }
  var previous;
  return keys.reduce(function (acc, breakpoint, i) {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] = breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (_typeof(breakpointValues) === 'object') {
      acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues;
    }
    return acc;
  }, {});
}
export default breakpoints;