import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["cssVarPrefix", "shouldSkipGeneratingVar"];
import prepareCssVars from './prepareCssVars';
function createCssVarsTheme(theme) {
  const {
      cssVarPrefix,
      shouldSkipGeneratingVar
    } = theme,
    otherTheme = _objectWithoutPropertiesLoose(theme, _excluded);
  return _extends({}, theme, prepareCssVars(otherTheme, {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar
  }));
}
export default createCssVarsTheme;