import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
export var filterBreakpointKeys = function filterBreakpointKeys(breakpointsKeys, responsiveKeys) {
  return breakpointsKeys.filter(function (key) {
    return responsiveKeys.includes(key);
  });
};
export var traverseBreakpoints = function traverseBreakpoints(breakpoints, responsive, iterator) {
  var smallestBreakpoint = breakpoints.keys[0]; // the keys is sorted from smallest to largest by `createBreakpoints`.

  if (Array.isArray(responsive)) {
    responsive.forEach(function (breakpointValue, index) {
      iterator(function (responsiveStyles, style) {
        if (index <= breakpoints.keys.length - 1) {
          if (index === 0) {
            _extends(responsiveStyles, style);
          } else {
            responsiveStyles[breakpoints.up(breakpoints.keys[index])] = style;
          }
        }
      }, breakpointValue);
    });
  } else if (responsive && _typeof(responsive) === 'object') {
    // prevent null
    // responsive could be a very big object, pick the smallest responsive values

    var keys = Object.keys(responsive).length > breakpoints.keys.length ? breakpoints.keys : filterBreakpointKeys(breakpoints.keys, Object.keys(responsive));
    keys.forEach(function (key) {
      if (breakpoints.keys.indexOf(key) !== -1) {
        // @ts-ignore already checked that responsive is an object
        var breakpointValue = responsive[key];
        if (breakpointValue !== undefined) {
          iterator(function (responsiveStyles, style) {
            if (smallestBreakpoint === key) {
              _extends(responsiveStyles, style);
            } else {
              responsiveStyles[breakpoints.up(key)] = style;
            }
          }, breakpointValue);
        }
      }
    });
  } else if (typeof responsive === 'number' || typeof responsive === 'string') {
    iterator(function (responsiveStyles, style) {
      _extends(responsiveStyles, style);
    }, responsive);
  }
};