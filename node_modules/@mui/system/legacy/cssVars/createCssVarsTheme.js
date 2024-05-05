import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import prepareCssVars from './prepareCssVars';
function createCssVarsTheme(theme) {
  var cssVarPrefix = theme.cssVarPrefix,
    shouldSkipGeneratingVar = theme.shouldSkipGeneratingVar,
    otherTheme = _objectWithoutProperties(theme, ["cssVarPrefix", "shouldSkipGeneratingVar"]);
  return _extends({}, theme, prepareCssVars(otherTheme, {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar: shouldSkipGeneratingVar
  }));
}
export default createCssVarsTheme;