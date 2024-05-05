import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
/**
 * The benefit of this function is to help developers get CSS var from theme without specifying the whole variable
 * and they does not need to remember the prefix (defined once).
 */
export default function createGetCssVar() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  function appendVar() {
    for (var _len = arguments.length, vars = new Array(_len), _key = 0; _key < _len; _key++) {
      vars[_key] = arguments[_key];
    }
    if (!vars.length) {
      return '';
    }
    var value = vars[0];
    if (typeof value === 'string' && !value.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/)) {
      return ", var(--".concat(prefix ? "".concat(prefix, "-") : '').concat(value).concat(appendVar.apply(void 0, _toConsumableArray(vars.slice(1))), ")");
    }
    return ", ".concat(value);
  }

  // AdditionalVars makes `getCssVar` less strict, so it can be use like this `getCssVar('non-mui-variable')` without type error.
  var getCssVar = function getCssVar(field) {
    for (var _len2 = arguments.length, fallbacks = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      fallbacks[_key2 - 1] = arguments[_key2];
    }
    return "var(--".concat(prefix ? "".concat(prefix, "-") : '').concat(field).concat(appendVar.apply(void 0, fallbacks), ")");
  };
  return getCssVar;
}