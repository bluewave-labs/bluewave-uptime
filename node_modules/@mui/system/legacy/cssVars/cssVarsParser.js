import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _typeof from "@babel/runtime/helpers/esm/typeof";
/**
 * This function create an object from keys, value and then assign to target
 *
 * @param {Object} obj : the target object to be assigned
 * @param {string[]} keys
 * @param {string | number} value
 *
 * @example
 * const source = {}
 * assignNestedKeys(source, ['palette', 'primary'], 'var(--palette-primary)')
 * console.log(source) // { palette: { primary: 'var(--palette-primary)' } }
 *
 * @example
 * const source = { palette: { primary: 'var(--palette-primary)' } }
 * assignNestedKeys(source, ['palette', 'secondary'], 'var(--palette-secondary)')
 * console.log(source) // { palette: { primary: 'var(--palette-primary)', secondary: 'var(--palette-secondary)' } }
 */
export var assignNestedKeys = function assignNestedKeys(obj, keys, value) {
  var arrayKeys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var temp = obj;
  keys.forEach(function (k, index) {
    if (index === keys.length - 1) {
      if (Array.isArray(temp)) {
        temp[Number(k)] = value;
      } else if (temp && _typeof(temp) === 'object') {
        temp[k] = value;
      }
    } else if (temp && _typeof(temp) === 'object') {
      if (!temp[k]) {
        temp[k] = arrayKeys.includes(k) ? [] : {};
      }
      temp = temp[k];
    }
  });
};

/**
 *
 * @param {Object} obj : source object
 * @param {Function} callback : a function that will be called when
 *                   - the deepest key in source object is reached
 *                   - the value of the deepest key is NOT `undefined` | `null`
 *
 * @example
 * walkObjectDeep({ palette: { primary: { main: '#000000' } } }, console.log)
 * // ['palette', 'primary', 'main'] '#000000'
 */
export var walkObjectDeep = function walkObjectDeep(obj, callback, shouldSkipPaths) {
  function recurse(object) {
    var parentKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var arrayKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    Object.entries(object).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      if (!shouldSkipPaths || shouldSkipPaths && !shouldSkipPaths([].concat(_toConsumableArray(parentKeys), [key]))) {
        if (value !== undefined && value !== null) {
          if (_typeof(value) === 'object' && Object.keys(value).length > 0) {
            recurse(value, [].concat(_toConsumableArray(parentKeys), [key]), Array.isArray(value) ? [].concat(_toConsumableArray(arrayKeys), [key]) : arrayKeys);
          } else {
            callback([].concat(_toConsumableArray(parentKeys), [key]), value, arrayKeys);
          }
        }
      }
    });
  }
  recurse(obj);
};
var getCssValue = function getCssValue(keys, value) {
  if (typeof value === 'number') {
    if (['lineHeight', 'fontWeight', 'opacity', 'zIndex'].some(function (prop) {
      return keys.includes(prop);
    })) {
      // CSS property that are unitless
      return value;
    }
    var lastKey = keys[keys.length - 1];
    if (lastKey.toLowerCase().indexOf('opacity') >= 0) {
      // opacity values are unitless
      return value;
    }
    return "".concat(value, "px");
  }
  return value;
};

/**
 * a function that parse theme and return { css, vars }
 *
 * @param {Object} theme
 * @param {{
 *  prefix?: string,
 *  shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean
 * }} options.
 *  `prefix`: The prefix of the generated CSS variables. This function does not change the value.
 *
 * @returns {{ css: Object, vars: Object }} `css` is the stylesheet, `vars` is an object to get css variable (same structure as theme).
 *
 * @example
 * const { css, vars } = parser({
 *   fontSize: 12,
 *   lineHeight: 1.2,
 *   palette: { primary: { 500: 'var(--color)' } }
 * }, { prefix: 'foo' })
 *
 * console.log(css) // { '--foo-fontSize': '12px', '--foo-lineHeight': 1.2, '--foo-palette-primary-500': 'var(--color)' }
 * console.log(vars) // { fontSize: 'var(--foo-fontSize)', lineHeight: 'var(--foo-lineHeight)', palette: { primary: { 500: 'var(--foo-palette-primary-500)' } } }
 */
export default function cssVarsParser(theme, options) {
  var _ref3 = options || {},
    prefix = _ref3.prefix,
    shouldSkipGeneratingVar = _ref3.shouldSkipGeneratingVar;
  var css = {};
  var vars = {};
  var varsWithDefaults = {};
  walkObjectDeep(theme, function (keys, value, arrayKeys) {
    if (typeof value === 'string' || typeof value === 'number') {
      if (!shouldSkipGeneratingVar || !shouldSkipGeneratingVar(keys, value)) {
        // only create css & var if `shouldSkipGeneratingVar` return false
        var cssVar = "--".concat(prefix ? "".concat(prefix, "-") : '').concat(keys.join('-'));
        _extends(css, _defineProperty({}, cssVar, getCssValue(keys, value)));
        assignNestedKeys(vars, keys, "var(".concat(cssVar, ")"), arrayKeys);
        assignNestedKeys(varsWithDefaults, keys, "var(".concat(cssVar, ", ").concat(value, ")"), arrayKeys);
      }
    }
  }, function (keys) {
    return keys[0] === 'vars';
  } // skip 'vars/*' paths
  );
  return {
    css: css,
    vars: vars,
    varsWithDefaults: varsWithDefaults
  };
}