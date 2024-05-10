import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _toPropertyKey from "@babel/runtime/helpers/esm/toPropertyKey";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import deepmerge from '@mui/utils/deepmerge';
import cssVarsParser from './cssVarsParser';
function prepareCssVars(theme, parserConfig) {
  // @ts-ignore - ignore components do not exist
  var _theme$colorSchemes = theme.colorSchemes,
    colorSchemes = _theme$colorSchemes === void 0 ? {} : _theme$colorSchemes,
    components = theme.components,
    _theme$defaultColorSc = theme.defaultColorScheme,
    defaultColorScheme = _theme$defaultColorSc === void 0 ? 'light' : _theme$defaultColorSc,
    otherTheme = _objectWithoutProperties(theme, ["colorSchemes", "components", "defaultColorScheme"]);
  var _cssVarsParser = cssVarsParser(otherTheme, parserConfig),
    rootVars = _cssVarsParser.vars,
    rootCss = _cssVarsParser.css,
    rootVarsWithDefaults = _cssVarsParser.varsWithDefaults;
  var themeVars = rootVarsWithDefaults;
  var colorSchemesMap = {};
  var light = colorSchemes[defaultColorScheme],
    otherColorSchemes = _objectWithoutProperties(colorSchemes, [defaultColorScheme].map(_toPropertyKey));
  Object.entries(otherColorSchemes || {}).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      scheme = _ref2[1];
    var _cssVarsParser2 = cssVarsParser(scheme, parserConfig),
      vars = _cssVarsParser2.vars,
      css = _cssVarsParser2.css,
      varsWithDefaults = _cssVarsParser2.varsWithDefaults;
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[key] = {
      css: css,
      vars: vars
    };
  });
  if (light) {
    // default color scheme vars should be merged last to set as default
    var _cssVarsParser3 = cssVarsParser(light, parserConfig),
      _css = _cssVarsParser3.css,
      vars = _cssVarsParser3.vars,
      varsWithDefaults = _cssVarsParser3.varsWithDefaults;
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[defaultColorScheme] = {
      css: _css,
      vars: vars
    };
  }
  var generateCssVars = function generateCssVars(colorScheme) {
    var _parserConfig$getSele2;
    if (!colorScheme) {
      var _parserConfig$getSele;
      var _css2 = _extends({}, rootCss);
      return {
        css: _css2,
        vars: rootVars,
        selector: (parserConfig == null || (_parserConfig$getSele = parserConfig.getSelector) == null ? void 0 : _parserConfig$getSele.call(parserConfig, colorScheme, _css2)) || ':root'
      };
    }
    var css = _extends({}, colorSchemesMap[colorScheme].css);
    return {
      css: css,
      vars: colorSchemesMap[colorScheme].vars,
      selector: (parserConfig == null || (_parserConfig$getSele2 = parserConfig.getSelector) == null ? void 0 : _parserConfig$getSele2.call(parserConfig, colorScheme, css)) || ':root'
    };
  };
  return {
    vars: themeVars,
    generateCssVars: generateCssVars
  };
}
export default prepareCssVars;