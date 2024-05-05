import _typeof from "@babel/runtime/helpers/esm/typeof";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import capitalize from '@mui/utils/capitalize';
import merge from '../merge';
import { getPath, getStyleValue as getValue } from '../style';
import { handleBreakpoints, createEmptyBreakpointObject, removeUnusedBreakpoints } from '../breakpoints';
import defaultSxConfig from './defaultSxConfig';
function objectsHaveSameKeys() {
  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }
  var allKeys = objects.reduce(function (keys, object) {
    return keys.concat(Object.keys(object));
  }, []);
  var union = new Set(allKeys);
  return objects.every(function (object) {
    return union.size === Object.keys(object).length;
  });
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config) {
    var props = _defineProperty(_defineProperty({}, prop, val), "theme", theme);
    var options = config[prop];
    if (!options) {
      return _defineProperty({}, prop, val);
    }
    var _options$cssProperty = options.cssProperty,
      cssProperty = _options$cssProperty === void 0 ? prop : _options$cssProperty,
      themeKey = options.themeKey,
      transform = options.transform,
      style = options.style;
    if (val == null) {
      return null;
    }

    // TODO v6: remove, see https://github.com/mui/material-ui/pull/38123
    if (themeKey === 'typography' && val === 'inherit') {
      return _defineProperty({}, prop, val);
    }
    var themeMapping = getPath(theme, themeKey) || {};
    if (style) {
      return style(props);
    }
    var styleFromPropValue = function styleFromPropValue(propValueFinal) {
      var value = getValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === 'string') {
        // Haven't found value
        value = getValue(themeMapping, transform, "".concat(prop).concat(propValueFinal === 'default' ? '' : capitalize(propValueFinal)), propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return _defineProperty({}, cssProperty, value);
    };
    return handleBreakpoints(props, val, styleFromPropValue);
  }
  function styleFunctionSx(props) {
    var _theme$unstable_sxCon;
    var _ref4 = props || {},
      sx = _ref4.sx,
      _ref4$theme = _ref4.theme,
      theme = _ref4$theme === void 0 ? {} : _ref4$theme;
    if (!sx) {
      return null; // Emotion & styled-components will neglect null
    }
    var config = (_theme$unstable_sxCon = theme.unstable_sxConfig) != null ? _theme$unstable_sxCon : defaultSxConfig;

    /*
     * Receive `sxInput` as object or callback
     * and then recursively check keys & values to create media query object styles.
     * (the result will be used in `styled`)
     */
    function traverse(sxInput) {
      var sxObject = sxInput;
      if (typeof sxInput === 'function') {
        sxObject = sxInput(theme);
      } else if (_typeof(sxInput) !== 'object') {
        // value
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      var emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      var breakpointsKeys = Object.keys(emptyBreakpoints);
      var css = emptyBreakpoints;
      Object.keys(sxObject).forEach(function (styleKey) {
        var value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== undefined) {
          if (_typeof(value) === 'object') {
            if (config[styleKey]) {
              css = merge(css, getThemeValue(styleKey, value, theme, config));
            } else {
              var breakpointsValues = handleBreakpoints({
                theme: theme
              }, value, function (x) {
                return _defineProperty({}, styleKey, x);
              });
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css[styleKey] = styleFunctionSx({
                  sx: value,
                  theme: theme
                });
              } else {
                css = merge(css, breakpointsValues);
              }
            }
          } else {
            css = merge(css, getThemeValue(styleKey, value, theme, config));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css);
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx;
}
var styleFunctionSx = unstable_createStyleFunctionSx();
styleFunctionSx.filterProps = ['sx'];
export default styleFunctionSx;