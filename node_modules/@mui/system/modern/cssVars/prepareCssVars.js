import _extends from "@babel/runtime/helpers/esm/extends";
import _toPropertyKey from "@babel/runtime/helpers/esm/toPropertyKey";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["colorSchemes", "components", "defaultColorScheme"];
import deepmerge from '@mui/utils/deepmerge';
import cssVarsParser from './cssVarsParser';
function prepareCssVars(theme, parserConfig) {
  // @ts-ignore - ignore components do not exist
  const {
      colorSchemes = {},
      defaultColorScheme = 'light'
    } = theme,
    otherTheme = _objectWithoutPropertiesLoose(theme, _excluded);
  const {
    vars: rootVars,
    css: rootCss,
    varsWithDefaults: rootVarsWithDefaults
  } = cssVarsParser(otherTheme, parserConfig);
  let themeVars = rootVarsWithDefaults;
  const colorSchemesMap = {};
  const {
      [defaultColorScheme]: light
    } = colorSchemes,
    otherColorSchemes = _objectWithoutPropertiesLoose(colorSchemes, [defaultColorScheme].map(_toPropertyKey));
  Object.entries(otherColorSchemes || {}).forEach(([key, scheme]) => {
    const {
      vars,
      css,
      varsWithDefaults
    } = cssVarsParser(scheme, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[key] = {
      css,
      vars
    };
  });
  if (light) {
    // default color scheme vars should be merged last to set as default
    const {
      css,
      vars,
      varsWithDefaults
    } = cssVarsParser(light, parserConfig);
    themeVars = deepmerge(themeVars, varsWithDefaults);
    colorSchemesMap[defaultColorScheme] = {
      css,
      vars
    };
  }
  const generateCssVars = colorScheme => {
    if (!colorScheme) {
      const css = _extends({}, rootCss);
      return {
        css,
        vars: rootVars,
        selector: parserConfig?.getSelector?.(colorScheme, css) || ':root'
      };
    }
    const css = _extends({}, colorSchemesMap[colorScheme].css);
    return {
      css,
      vars: colorSchemesMap[colorScheme].vars,
      selector: parserConfig?.getSelector?.(colorScheme, css) || ':root'
    };
  };
  return {
    vars: themeVars,
    generateCssVars
  };
}
export default prepareCssVars;