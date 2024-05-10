"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  experimental_sx: true,
  THEME_ID: true,
  adaptV4Theme: true,
  hexToRgb: true,
  rgbToHex: true,
  hslToRgb: true,
  decomposeColor: true,
  recomposeColor: true,
  getContrastRatio: true,
  getLuminance: true,
  emphasize: true,
  alpha: true,
  darken: true,
  lighten: true,
  css: true,
  keyframes: true,
  StyledEngineProvider: true,
  createTheme: true,
  createMuiTheme: true,
  unstable_createMuiStrictModeTheme: true,
  createStyles: true,
  unstable_getUnit: true,
  unstable_toUnitless: true,
  responsiveFontSizes: true,
  duration: true,
  easing: true,
  useTheme: true,
  useThemeProps: true,
  styled: true,
  experimentalStyled: true,
  ThemeProvider: true,
  makeStyles: true,
  withStyles: true,
  withTheme: true,
  experimental_extendTheme: true,
  getOverlayAlpha: true,
  shouldSkipGeneratingVar: true,
  private_createTypography: true,
  private_createMixins: true,
  private_excludeVariablesFromRoot: true
};
Object.defineProperty(exports, "StyledEngineProvider", {
  enumerable: true,
  get: function () {
    return _system.StyledEngineProvider;
  }
});
Object.defineProperty(exports, "THEME_ID", {
  enumerable: true,
  get: function () {
    return _identifier.default;
  }
});
Object.defineProperty(exports, "ThemeProvider", {
  enumerable: true,
  get: function () {
    return _ThemeProvider.default;
  }
});
Object.defineProperty(exports, "adaptV4Theme", {
  enumerable: true,
  get: function () {
    return _adaptV4Theme.default;
  }
});
Object.defineProperty(exports, "alpha", {
  enumerable: true,
  get: function () {
    return _system.alpha;
  }
});
Object.defineProperty(exports, "createMuiTheme", {
  enumerable: true,
  get: function () {
    return _createTheme.createMuiTheme;
  }
});
Object.defineProperty(exports, "createStyles", {
  enumerable: true,
  get: function () {
    return _createStyles.default;
  }
});
Object.defineProperty(exports, "createTheme", {
  enumerable: true,
  get: function () {
    return _createTheme.default;
  }
});
Object.defineProperty(exports, "css", {
  enumerable: true,
  get: function () {
    return _system.css;
  }
});
Object.defineProperty(exports, "darken", {
  enumerable: true,
  get: function () {
    return _system.darken;
  }
});
Object.defineProperty(exports, "decomposeColor", {
  enumerable: true,
  get: function () {
    return _system.decomposeColor;
  }
});
Object.defineProperty(exports, "duration", {
  enumerable: true,
  get: function () {
    return _createTransitions.duration;
  }
});
Object.defineProperty(exports, "easing", {
  enumerable: true,
  get: function () {
    return _createTransitions.easing;
  }
});
Object.defineProperty(exports, "emphasize", {
  enumerable: true,
  get: function () {
    return _system.emphasize;
  }
});
Object.defineProperty(exports, "experimentalStyled", {
  enumerable: true,
  get: function () {
    return _styled.default;
  }
});
Object.defineProperty(exports, "experimental_extendTheme", {
  enumerable: true,
  get: function () {
    return _experimental_extendTheme.default;
  }
});
exports.experimental_sx = experimental_sx;
Object.defineProperty(exports, "getContrastRatio", {
  enumerable: true,
  get: function () {
    return _system.getContrastRatio;
  }
});
Object.defineProperty(exports, "getLuminance", {
  enumerable: true,
  get: function () {
    return _system.getLuminance;
  }
});
Object.defineProperty(exports, "getOverlayAlpha", {
  enumerable: true,
  get: function () {
    return _getOverlayAlpha.default;
  }
});
Object.defineProperty(exports, "hexToRgb", {
  enumerable: true,
  get: function () {
    return _system.hexToRgb;
  }
});
Object.defineProperty(exports, "hslToRgb", {
  enumerable: true,
  get: function () {
    return _system.hslToRgb;
  }
});
Object.defineProperty(exports, "keyframes", {
  enumerable: true,
  get: function () {
    return _system.keyframes;
  }
});
Object.defineProperty(exports, "lighten", {
  enumerable: true,
  get: function () {
    return _system.lighten;
  }
});
Object.defineProperty(exports, "makeStyles", {
  enumerable: true,
  get: function () {
    return _makeStyles.default;
  }
});
Object.defineProperty(exports, "private_createMixins", {
  enumerable: true,
  get: function () {
    return _createMixins.default;
  }
});
Object.defineProperty(exports, "private_createTypography", {
  enumerable: true,
  get: function () {
    return _createTypography.default;
  }
});
Object.defineProperty(exports, "private_excludeVariablesFromRoot", {
  enumerable: true,
  get: function () {
    return _excludeVariablesFromRoot.default;
  }
});
Object.defineProperty(exports, "recomposeColor", {
  enumerable: true,
  get: function () {
    return _system.recomposeColor;
  }
});
Object.defineProperty(exports, "responsiveFontSizes", {
  enumerable: true,
  get: function () {
    return _responsiveFontSizes.default;
  }
});
Object.defineProperty(exports, "rgbToHex", {
  enumerable: true,
  get: function () {
    return _system.rgbToHex;
  }
});
Object.defineProperty(exports, "shouldSkipGeneratingVar", {
  enumerable: true,
  get: function () {
    return _shouldSkipGeneratingVar.default;
  }
});
Object.defineProperty(exports, "styled", {
  enumerable: true,
  get: function () {
    return _styled.default;
  }
});
Object.defineProperty(exports, "unstable_createMuiStrictModeTheme", {
  enumerable: true,
  get: function () {
    return _createMuiStrictModeTheme.default;
  }
});
Object.defineProperty(exports, "unstable_getUnit", {
  enumerable: true,
  get: function () {
    return _cssUtils.getUnit;
  }
});
Object.defineProperty(exports, "unstable_toUnitless", {
  enumerable: true,
  get: function () {
    return _cssUtils.toUnitless;
  }
});
Object.defineProperty(exports, "useTheme", {
  enumerable: true,
  get: function () {
    return _useTheme.default;
  }
});
Object.defineProperty(exports, "useThemeProps", {
  enumerable: true,
  get: function () {
    return _useThemeProps.default;
  }
});
Object.defineProperty(exports, "withStyles", {
  enumerable: true,
  get: function () {
    return _withStyles.default;
  }
});
Object.defineProperty(exports, "withTheme", {
  enumerable: true,
  get: function () {
    return _withTheme.default;
  }
});
var _formatMuiErrorMessage2 = _interopRequireDefault(require("@mui/utils/formatMuiErrorMessage"));
var _identifier = _interopRequireDefault(require("./identifier"));
var _adaptV4Theme = _interopRequireDefault(require("./adaptV4Theme"));
var _system = require("@mui/system");
var _createTheme = _interopRequireWildcard(require("./createTheme"));
var _createMuiStrictModeTheme = _interopRequireDefault(require("./createMuiStrictModeTheme"));
var _createStyles = _interopRequireDefault(require("./createStyles"));
var _cssUtils = require("./cssUtils");
var _responsiveFontSizes = _interopRequireDefault(require("./responsiveFontSizes"));
var _createTransitions = require("./createTransitions");
var _useTheme = _interopRequireDefault(require("./useTheme"));
var _useThemeProps = _interopRequireDefault(require("./useThemeProps"));
var _styled = _interopRequireDefault(require("./styled"));
var _ThemeProvider = _interopRequireDefault(require("./ThemeProvider"));
var _makeStyles = _interopRequireDefault(require("./makeStyles"));
var _withStyles = _interopRequireDefault(require("./withStyles"));
var _withTheme = _interopRequireDefault(require("./withTheme"));
var _CssVarsProvider = require("./CssVarsProvider");
Object.keys(_CssVarsProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _CssVarsProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _CssVarsProvider[key];
    }
  });
});
var _experimental_extendTheme = _interopRequireDefault(require("./experimental_extendTheme"));
var _getOverlayAlpha = _interopRequireDefault(require("./getOverlayAlpha"));
var _shouldSkipGeneratingVar = _interopRequireDefault(require("./shouldSkipGeneratingVar"));
var _createTypography = _interopRequireDefault(require("./createTypography"));
var _createMixins = _interopRequireDefault(require("./createMixins"));
var _excludeVariablesFromRoot = _interopRequireDefault(require("./excludeVariablesFromRoot"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// TODO: Remove this function in v6.
// eslint-disable-next-line @typescript-eslint/naming-convention
function experimental_sx() {
  throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`experimental_sx\` has been moved to \`theme.unstable_sx\`.For more details, see https://github.com/mui/material-ui/pull/35150.` : (0, _formatMuiErrorMessage2.default)(20));
}

// The legacy utilities from @mui/styles
// These are just empty functions that throws when invoked

// Private methods for creating parts of the theme