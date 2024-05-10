import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
/**
 * @internal These variables should not appear in the :root stylesheet when the `defaultMode="dark"`
 */
var excludeVariablesFromRoot = function excludeVariablesFromRoot(cssVarPrefix) {
  return [].concat(_toConsumableArray(_toConsumableArray(Array(24)).map(function (_, index) {
    return "--".concat(cssVarPrefix ? "".concat(cssVarPrefix, "-") : '', "overlays-").concat(index + 1);
  })), ["--".concat(cssVarPrefix ? "".concat(cssVarPrefix, "-") : '', "palette-AppBar-darkBg"), "--".concat(cssVarPrefix ? "".concat(cssVarPrefix, "-") : '', "palette-AppBar-darkColor")]);
};
export default excludeVariablesFromRoot;