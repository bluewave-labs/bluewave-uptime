import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _formatMuiErrorMessage from "@mui/utils/formatMuiErrorMessage";
import * as React from 'react';
import PropTypes from 'prop-types';
import deepmerge from '@mui/utils/deepmerge';
import { GlobalStyles } from '@mui/styled-engine';
import { useTheme as muiUseTheme } from '@mui/private-theming';
import ThemeProvider from '../ThemeProvider';
import systemGetInitColorSchemeScript, { DEFAULT_ATTRIBUTE, DEFAULT_COLOR_SCHEME_STORAGE_KEY, DEFAULT_MODE_STORAGE_KEY } from './getInitColorSchemeScript';
import useCurrentColorScheme from './useCurrentColorScheme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var DISABLE_CSS_TRANSITION = '*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}';
export default function createCssVarsProvider(options) {
  var themeId = options.themeId,
    _options$theme = options.theme,
    defaultTheme = _options$theme === void 0 ? {} : _options$theme,
    _options$attribute = options.attribute,
    defaultAttribute = _options$attribute === void 0 ? DEFAULT_ATTRIBUTE : _options$attribute,
    _options$modeStorageK = options.modeStorageKey,
    defaultModeStorageKey = _options$modeStorageK === void 0 ? DEFAULT_MODE_STORAGE_KEY : _options$modeStorageK,
    _options$colorSchemeS = options.colorSchemeStorageKey,
    defaultColorSchemeStorageKey = _options$colorSchemeS === void 0 ? DEFAULT_COLOR_SCHEME_STORAGE_KEY : _options$colorSchemeS,
    _options$defaultMode = options.defaultMode,
    designSystemMode = _options$defaultMode === void 0 ? 'light' : _options$defaultMode,
    designSystemColorScheme = options.defaultColorScheme,
    _options$disableTrans = options.disableTransitionOnChange,
    designSystemTransitionOnChange = _options$disableTrans === void 0 ? false : _options$disableTrans,
    resolveTheme = options.resolveTheme,
    excludeVariablesFromRoot = options.excludeVariablesFromRoot;
  if (!defaultTheme.colorSchemes || typeof designSystemColorScheme === 'string' && !defaultTheme.colorSchemes[designSystemColorScheme] || _typeof(designSystemColorScheme) === 'object' && !defaultTheme.colorSchemes[designSystemColorScheme == null ? void 0 : designSystemColorScheme.light] || _typeof(designSystemColorScheme) === 'object' && !defaultTheme.colorSchemes[designSystemColorScheme == null ? void 0 : designSystemColorScheme.dark]) {
    console.error("MUI: `".concat(designSystemColorScheme, "` does not exist in `theme.colorSchemes`."));
  }
  var ColorSchemeContext = /*#__PURE__*/React.createContext(undefined);
  if (process.env.NODE_ENV !== 'production') {
    ColorSchemeContext.displayName = 'ColorSchemeContext';
  }
  var useColorScheme = function useColorScheme() {
    var value = React.useContext(ColorSchemeContext);
    if (!value) {
      throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `useColorScheme` must be called under <CssVarsProvider />" : _formatMuiErrorMessage(19));
    }
    return value;
  };
  function CssVarsProvider(props) {
    var children = props.children,
      _props$theme = props.theme,
      themeProp = _props$theme === void 0 ? defaultTheme : _props$theme,
      _props$modeStorageKey = props.modeStorageKey,
      modeStorageKey = _props$modeStorageKey === void 0 ? defaultModeStorageKey : _props$modeStorageKey,
      _props$colorSchemeSto = props.colorSchemeStorageKey,
      colorSchemeStorageKey = _props$colorSchemeSto === void 0 ? defaultColorSchemeStorageKey : _props$colorSchemeSto,
      _props$attribute = props.attribute,
      attribute = _props$attribute === void 0 ? defaultAttribute : _props$attribute,
      _props$defaultMode = props.defaultMode,
      defaultMode = _props$defaultMode === void 0 ? designSystemMode : _props$defaultMode,
      _props$defaultColorSc = props.defaultColorScheme,
      defaultColorScheme = _props$defaultColorSc === void 0 ? designSystemColorScheme : _props$defaultColorSc,
      _props$disableTransit = props.disableTransitionOnChange,
      disableTransitionOnChange = _props$disableTransit === void 0 ? designSystemTransitionOnChange : _props$disableTransit,
      _props$storageWindow = props.storageWindow,
      storageWindow = _props$storageWindow === void 0 ? typeof window === 'undefined' ? undefined : window : _props$storageWindow,
      _props$documentNode = props.documentNode,
      documentNode = _props$documentNode === void 0 ? typeof document === 'undefined' ? undefined : document : _props$documentNode,
      _props$colorSchemeNod = props.colorSchemeNode,
      colorSchemeNode = _props$colorSchemeNod === void 0 ? typeof document === 'undefined' ? undefined : document.documentElement : _props$colorSchemeNod,
      _props$colorSchemeSel = props.colorSchemeSelector,
      colorSchemeSelector = _props$colorSchemeSel === void 0 ? ':root' : _props$colorSchemeSel,
      _props$disableNestedC = props.disableNestedContext,
      disableNestedContext = _props$disableNestedC === void 0 ? false : _props$disableNestedC,
      _props$disableStyleSh = props.disableStyleSheetGeneration,
      disableStyleSheetGeneration = _props$disableStyleSh === void 0 ? false : _props$disableStyleSh;
    var hasMounted = React.useRef(false);
    var upperTheme = muiUseTheme();
    var ctx = React.useContext(ColorSchemeContext);
    var nested = !!ctx && !disableNestedContext;
    var scopedTheme = themeProp[themeId];
    var _ref = scopedTheme || themeProp,
      _ref$colorSchemes = _ref.colorSchemes,
      colorSchemes = _ref$colorSchemes === void 0 ? {} : _ref$colorSchemes,
      _ref$components = _ref.components,
      components = _ref$components === void 0 ? {} : _ref$components,
      _ref$generateCssVars = _ref.generateCssVars,
      generateCssVars = _ref$generateCssVars === void 0 ? function () {
        return {
          vars: {},
          css: {}
        };
      } : _ref$generateCssVars,
      cssVarPrefix = _ref.cssVarPrefix,
      restThemeProp = _objectWithoutProperties(_ref, ["colorSchemes", "components", "generateCssVars", "cssVarPrefix"]);
    var allColorSchemes = Object.keys(colorSchemes);
    var defaultLightColorScheme = typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.light;
    var defaultDarkColorScheme = typeof defaultColorScheme === 'string' ? defaultColorScheme : defaultColorScheme.dark;

    // 1. Get the data about the `mode`, `colorScheme`, and setter functions.
    var _useCurrentColorSchem = useCurrentColorScheme({
        supportedColorSchemes: allColorSchemes,
        defaultLightColorScheme: defaultLightColorScheme,
        defaultDarkColorScheme: defaultDarkColorScheme,
        modeStorageKey: modeStorageKey,
        colorSchemeStorageKey: colorSchemeStorageKey,
        defaultMode: defaultMode,
        storageWindow: storageWindow
      }),
      stateMode = _useCurrentColorSchem.mode,
      setMode = _useCurrentColorSchem.setMode,
      systemMode = _useCurrentColorSchem.systemMode,
      lightColorScheme = _useCurrentColorSchem.lightColorScheme,
      darkColorScheme = _useCurrentColorSchem.darkColorScheme,
      stateColorScheme = _useCurrentColorSchem.colorScheme,
      setColorScheme = _useCurrentColorSchem.setColorScheme;
    var mode = stateMode;
    var colorScheme = stateColorScheme;
    if (nested) {
      mode = ctx.mode;
      colorScheme = ctx.colorScheme;
    }
    var calculatedMode = function () {
      if (mode) {
        return mode;
      }
      // This scope occurs on the server
      if (defaultMode === 'system') {
        return designSystemMode;
      }
      return defaultMode;
    }();
    var calculatedColorScheme = function () {
      if (!colorScheme) {
        // This scope occurs on the server
        if (calculatedMode === 'dark') {
          return defaultDarkColorScheme;
        }
        // use light color scheme, if default mode is 'light' | 'system'
        return defaultLightColorScheme;
      }
      return colorScheme;
    }();

    // 2. Create CSS variables and store them in objects (to be generated in stylesheets in the final step)
    var _generateCssVars = generateCssVars(),
      rootCss = _generateCssVars.css,
      rootVars = _generateCssVars.vars; // 3. Start composing the theme object
    var theme = _extends({}, restThemeProp, {
      components: components,
      colorSchemes: colorSchemes,
      cssVarPrefix: cssVarPrefix,
      vars: rootVars,
      getColorSchemeSelector: function getColorSchemeSelector(targetColorScheme) {
        return "[".concat(attribute, "=\"").concat(targetColorScheme, "\"] &");
      }
    });

    // 4. Create color CSS variables and store them in objects (to be generated in stylesheets in the final step)
    //    The default color scheme stylesheet is constructed to have the least CSS specificity.
    //    The other color schemes uses selector, default as data attribute, to increase the CSS specificity so that they can override the default color scheme stylesheet.
    var defaultColorSchemeStyleSheet = {};
    var otherColorSchemesStyleSheet = {};
    Object.entries(colorSchemes).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        scheme = _ref3[1];
      var _generateCssVars2 = generateCssVars(key),
        css = _generateCssVars2.css,
        vars = _generateCssVars2.vars;
      theme.vars = deepmerge(theme.vars, vars);
      if (key === calculatedColorScheme) {
        // 4.1 Merge the selected color scheme to the theme
        Object.keys(scheme).forEach(function (schemeKey) {
          if (scheme[schemeKey] && _typeof(scheme[schemeKey]) === 'object') {
            // shallow merge the 1st level structure of the theme.
            theme[schemeKey] = _extends({}, theme[schemeKey], scheme[schemeKey]);
          } else {
            theme[schemeKey] = scheme[schemeKey];
          }
        });
        if (theme.palette) {
          theme.palette.colorScheme = key;
        }
      }
      var resolvedDefaultColorScheme = function () {
        if (typeof defaultColorScheme === 'string') {
          return defaultColorScheme;
        }
        if (defaultMode === 'dark') {
          return defaultColorScheme.dark;
        }
        return defaultColorScheme.light;
      }();
      if (key === resolvedDefaultColorScheme) {
        if (excludeVariablesFromRoot) {
          var excludedVariables = {};
          excludeVariablesFromRoot(cssVarPrefix).forEach(function (cssVar) {
            excludedVariables[cssVar] = css[cssVar];
            delete css[cssVar];
          });
          defaultColorSchemeStyleSheet["[".concat(attribute, "=\"").concat(key, "\"]")] = excludedVariables;
        }
        defaultColorSchemeStyleSheet["".concat(colorSchemeSelector, ", [").concat(attribute, "=\"").concat(key, "\"]")] = css;
      } else {
        otherColorSchemesStyleSheet["".concat(colorSchemeSelector === ':root' ? '' : colorSchemeSelector, "[").concat(attribute, "=\"").concat(key, "\"]")] = css;
      }
    });
    theme.vars = deepmerge(theme.vars, rootVars);

    // 5. Declaring effects
    // 5.1 Updates the selector value to use the current color scheme which tells CSS to use the proper stylesheet.
    React.useEffect(function () {
      if (colorScheme && colorSchemeNode) {
        // attaches attribute to <html> because the css variables are attached to :root (html)
        colorSchemeNode.setAttribute(attribute, colorScheme);
      }
    }, [colorScheme, attribute, colorSchemeNode]);

    // 5.2 Remove the CSS transition when color scheme changes to create instant experience.
    // credit: https://github.com/pacocoursey/next-themes/blob/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a/index.tsx#L313
    React.useEffect(function () {
      var timer;
      if (disableTransitionOnChange && hasMounted.current && documentNode) {
        var css = documentNode.createElement('style');
        css.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION));
        documentNode.head.appendChild(css);

        // Force browser repaint
        (function () {
          return window.getComputedStyle(documentNode.body);
        })();
        timer = setTimeout(function () {
          documentNode.head.removeChild(css);
        }, 1);
      }
      return function () {
        clearTimeout(timer);
      };
    }, [colorScheme, disableTransitionOnChange, documentNode]);
    React.useEffect(function () {
      hasMounted.current = true;
      return function () {
        hasMounted.current = false;
      };
    }, []);
    var contextValue = React.useMemo(function () {
      return {
        allColorSchemes: allColorSchemes,
        colorScheme: colorScheme,
        darkColorScheme: darkColorScheme,
        lightColorScheme: lightColorScheme,
        mode: mode,
        setColorScheme: setColorScheme,
        setMode: setMode,
        systemMode: systemMode
      };
    }, [allColorSchemes, colorScheme, darkColorScheme, lightColorScheme, mode, setColorScheme, setMode, systemMode]);
    var shouldGenerateStyleSheet = true;
    if (disableStyleSheetGeneration || nested && (upperTheme == null ? void 0 : upperTheme.cssVarPrefix) === cssVarPrefix) {
      shouldGenerateStyleSheet = false;
    }
    var element = /*#__PURE__*/_jsxs(React.Fragment, {
      children: [shouldGenerateStyleSheet && /*#__PURE__*/_jsxs(React.Fragment, {
        children: [/*#__PURE__*/_jsx(GlobalStyles, {
          styles: _defineProperty({}, colorSchemeSelector, rootCss)
        }), /*#__PURE__*/_jsx(GlobalStyles, {
          styles: defaultColorSchemeStyleSheet
        }), /*#__PURE__*/_jsx(GlobalStyles, {
          styles: otherColorSchemesStyleSheet
        })]
      }), /*#__PURE__*/_jsx(ThemeProvider, {
        themeId: scopedTheme ? themeId : undefined,
        theme: resolveTheme ? resolveTheme(theme) : theme,
        children: children
      })]
    });
    if (nested) {
      return element;
    }
    return /*#__PURE__*/_jsx(ColorSchemeContext.Provider, {
      value: contextValue,
      children: element
    });
  }
  process.env.NODE_ENV !== "production" ? CssVarsProvider.propTypes = {
    /**
     * The body attribute name to attach colorScheme.
     */
    attribute: PropTypes.string,
    /**
     * The component tree.
     */
    children: PropTypes.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: PropTypes.any,
    /**
     * The CSS selector for attaching the generated custom properties
     */
    colorSchemeSelector: PropTypes.string,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: PropTypes.string,
    /**
     * The initial color scheme used.
     */
    defaultColorScheme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * The initial mode used.
     */
    defaultMode: PropTypes.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: PropTypes.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: PropTypes.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: PropTypes.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: PropTypes.any,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: PropTypes.string,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: PropTypes.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: PropTypes.object
  } : void 0;
  var defaultLightColorScheme = typeof designSystemColorScheme === 'string' ? designSystemColorScheme : designSystemColorScheme.light;
  var defaultDarkColorScheme = typeof designSystemColorScheme === 'string' ? designSystemColorScheme : designSystemColorScheme.dark;
  var getInitColorSchemeScript = function getInitColorSchemeScript(params) {
    return systemGetInitColorSchemeScript(_extends({
      attribute: defaultAttribute,
      colorSchemeStorageKey: defaultColorSchemeStorageKey,
      defaultMode: designSystemMode,
      defaultLightColorScheme: defaultLightColorScheme,
      defaultDarkColorScheme: defaultDarkColorScheme,
      modeStorageKey: defaultModeStorageKey
    }, params));
  };
  return {
    CssVarsProvider: CssVarsProvider,
    useColorScheme: useColorScheme,
    getInitColorSchemeScript: getInitColorSchemeScript
  };
}