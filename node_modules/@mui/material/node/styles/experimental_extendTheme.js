"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGetCssVar = void 0;
exports.default = extendTheme;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _deepmerge = _interopRequireDefault(require("@mui/utils/deepmerge"));
var _system = require("@mui/system");
var _styleFunctionSx = _interopRequireWildcard(require("@mui/system/styleFunctionSx"));
var _colorManipulator = require("@mui/system/colorManipulator");
var _shouldSkipGeneratingVar = _interopRequireDefault(require("./shouldSkipGeneratingVar"));
var _createTheme = _interopRequireDefault(require("./createTheme"));
var _getOverlayAlpha = _interopRequireDefault(require("./getOverlayAlpha"));
const _excluded = ["colorSchemes", "cssVarPrefix", "shouldSkipGeneratingVar"],
  _excluded2 = ["palette"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const defaultDarkOverlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return undefined;
  }
  const overlay = (0, _getOverlayAlpha.default)(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});
function assignNode(obj, keys) {
  keys.forEach(k => {
    if (!obj[k]) {
      obj[k] = {};
    }
  });
}
function setColor(obj, key, defaultValue) {
  if (!obj[key] && defaultValue) {
    obj[key] = defaultValue;
  }
}
function toRgb(color) {
  if (!color || !color.startsWith('hsl')) {
    return color;
  }
  return (0, _colorManipulator.hslToRgb)(color);
}
function setColorChannel(obj, key) {
  if (!(`${key}Channel` in obj)) {
    // custom channel token is not provided, generate one.
    // if channel token can't be generated, show a warning.
    obj[`${key}Channel`] = (0, _colorManipulator.private_safeColorChannel)(toRgb(obj[key]), `MUI: Can't create \`palette.${key}Channel\` because \`palette.${key}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` + '\n' + `To suppress this warning, you need to explicitly provide the \`palette.${key}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`);
  }
}
const silent = fn => {
  try {
    return fn();
  } catch (error) {
    // ignore error
  }
  return undefined;
};
const createGetCssVar = (cssVarPrefix = 'mui') => (0, _system.unstable_createGetCssVar)(cssVarPrefix);
exports.createGetCssVar = createGetCssVar;
function extendTheme(options = {}, ...args) {
  var _colorSchemesInput$li, _colorSchemesInput$da, _colorSchemesInput$li2, _colorSchemesInput$li3, _colorSchemesInput$da2, _colorSchemesInput$da3;
  const {
      colorSchemes: colorSchemesInput = {},
      cssVarPrefix = 'mui',
      shouldSkipGeneratingVar = _shouldSkipGeneratingVar.default
    } = options,
    input = (0, _objectWithoutPropertiesLoose2.default)(options, _excluded);
  const getCssVar = createGetCssVar(cssVarPrefix);
  const _createThemeWithoutVa = (0, _createTheme.default)((0, _extends2.default)({}, input, colorSchemesInput.light && {
      palette: (_colorSchemesInput$li = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li.palette
    })),
    {
      palette: lightPalette
    } = _createThemeWithoutVa,
    muiTheme = (0, _objectWithoutPropertiesLoose2.default)(_createThemeWithoutVa, _excluded2);
  const {
    palette: darkPalette
  } = (0, _createTheme.default)({
    palette: (0, _extends2.default)({
      mode: 'dark'
    }, (_colorSchemesInput$da = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da.palette)
  });
  let theme = (0, _extends2.default)({}, muiTheme, {
    cssVarPrefix,
    getCssVar,
    colorSchemes: (0, _extends2.default)({}, colorSchemesInput, {
      light: (0, _extends2.default)({}, colorSchemesInput.light, {
        palette: lightPalette,
        opacity: (0, _extends2.default)({
          inputPlaceholder: 0.42,
          inputUnderline: 0.42,
          switchTrackDisabled: 0.12,
          switchTrack: 0.38
        }, (_colorSchemesInput$li2 = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li2.opacity),
        overlays: ((_colorSchemesInput$li3 = colorSchemesInput.light) == null ? void 0 : _colorSchemesInput$li3.overlays) || []
      }),
      dark: (0, _extends2.default)({}, colorSchemesInput.dark, {
        palette: darkPalette,
        opacity: (0, _extends2.default)({
          inputPlaceholder: 0.5,
          inputUnderline: 0.7,
          switchTrackDisabled: 0.2,
          switchTrack: 0.3
        }, (_colorSchemesInput$da2 = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da2.opacity),
        overlays: ((_colorSchemesInput$da3 = colorSchemesInput.dark) == null ? void 0 : _colorSchemesInput$da3.overlays) || defaultDarkOverlays
      })
    })
  });
  Object.keys(theme.colorSchemes).forEach(key => {
    const palette = theme.colorSchemes[key].palette;
    const setCssVarColor = cssVar => {
      const tokens = cssVar.split('-');
      const color = tokens[1];
      const colorToken = tokens[2];
      return getCssVar(cssVar, palette[color][colorToken]);
    };

    // attach black & white channels to common node
    if (key === 'light') {
      setColor(palette.common, 'background', '#fff');
      setColor(palette.common, 'onBackground', '#000');
    } else {
      setColor(palette.common, 'background', '#000');
      setColor(palette.common, 'onBackground', '#fff');
    }

    // assign component variables
    assignNode(palette, ['Alert', 'AppBar', 'Avatar', 'Button', 'Chip', 'FilledInput', 'LinearProgress', 'Skeleton', 'Slider', 'SnackbarContent', 'SpeedDialAction', 'StepConnector', 'StepContent', 'Switch', 'TableCell', 'Tooltip']);
    if (key === 'light') {
      setColor(palette.Alert, 'errorColor', (0, _colorManipulator.private_safeDarken)(palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', (0, _colorManipulator.private_safeDarken)(palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', (0, _colorManipulator.private_safeDarken)(palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', (0, _colorManipulator.private_safeDarken)(palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', setCssVarColor('palette-error-main'));
      setColor(palette.Alert, 'infoFilledBg', setCssVarColor('palette-info-main'));
      setColor(palette.Alert, 'successFilledBg', setCssVarColor('palette-success-main'));
      setColor(palette.Alert, 'warningFilledBg', setCssVarColor('palette-warning-main'));
      setColor(palette.Alert, 'errorFilledColor', silent(() => lightPalette.getContrastText(palette.error.main)));
      setColor(palette.Alert, 'infoFilledColor', silent(() => lightPalette.getContrastText(palette.info.main)));
      setColor(palette.Alert, 'successFilledColor', silent(() => lightPalette.getContrastText(palette.success.main)));
      setColor(palette.Alert, 'warningFilledColor', silent(() => lightPalette.getContrastText(palette.warning.main)));
      setColor(palette.Alert, 'errorStandardBg', (0, _colorManipulator.private_safeLighten)(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', (0, _colorManipulator.private_safeLighten)(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', (0, _colorManipulator.private_safeLighten)(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', (0, _colorManipulator.private_safeLighten)(palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', setCssVarColor('palette-error-main'));
      setColor(palette.Alert, 'infoIconColor', setCssVarColor('palette-info-main'));
      setColor(palette.Alert, 'successIconColor', setCssVarColor('palette-success-main'));
      setColor(palette.Alert, 'warningIconColor', setCssVarColor('palette-warning-main'));
      setColor(palette.AppBar, 'defaultBg', setCssVarColor('palette-grey-100'));
      setColor(palette.Avatar, 'defaultBg', setCssVarColor('palette-grey-400'));
      setColor(palette.Button, 'inheritContainedBg', setCssVarColor('palette-grey-300'));
      setColor(palette.Button, 'inheritContainedHoverBg', setCssVarColor('palette-grey-A100'));
      setColor(palette.Chip, 'defaultBorder', setCssVarColor('palette-grey-400'));
      setColor(palette.Chip, 'defaultAvatarColor', setCssVarColor('palette-grey-700'));
      setColor(palette.Chip, 'defaultIconColor', setCssVarColor('palette-grey-700'));
      setColor(palette.FilledInput, 'bg', 'rgba(0, 0, 0, 0.06)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(0, 0, 0, 0.09)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(0, 0, 0, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', (0, _colorManipulator.private_safeLighten)(palette.primary.main, 0.62));
      setColor(palette.LinearProgress, 'secondaryBg', (0, _colorManipulator.private_safeLighten)(palette.secondary.main, 0.62));
      setColor(palette.LinearProgress, 'errorBg', (0, _colorManipulator.private_safeLighten)(palette.error.main, 0.62));
      setColor(palette.LinearProgress, 'infoBg', (0, _colorManipulator.private_safeLighten)(palette.info.main, 0.62));
      setColor(palette.LinearProgress, 'successBg', (0, _colorManipulator.private_safeLighten)(palette.success.main, 0.62));
      setColor(palette.LinearProgress, 'warningBg', (0, _colorManipulator.private_safeLighten)(palette.warning.main, 0.62));
      setColor(palette.Skeleton, 'bg', `rgba(${setCssVarColor('palette-text-primaryChannel')} / 0.11)`);
      setColor(palette.Slider, 'primaryTrack', (0, _colorManipulator.private_safeLighten)(palette.primary.main, 0.62));
      setColor(palette.Slider, 'secondaryTrack', (0, _colorManipulator.private_safeLighten)(palette.secondary.main, 0.62));
      setColor(palette.Slider, 'errorTrack', (0, _colorManipulator.private_safeLighten)(palette.error.main, 0.62));
      setColor(palette.Slider, 'infoTrack', (0, _colorManipulator.private_safeLighten)(palette.info.main, 0.62));
      setColor(palette.Slider, 'successTrack', (0, _colorManipulator.private_safeLighten)(palette.success.main, 0.62));
      setColor(palette.Slider, 'warningTrack', (0, _colorManipulator.private_safeLighten)(palette.warning.main, 0.62));
      const snackbarContentBackground = (0, _colorManipulator.private_safeEmphasize)(palette.background.default, 0.8);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(palette.SnackbarContent, 'color', silent(() => lightPalette.getContrastText(snackbarContentBackground)));
      setColor(palette.SpeedDialAction, 'fabHoverBg', (0, _colorManipulator.private_safeEmphasize)(palette.background.paper, 0.15));
      setColor(palette.StepConnector, 'border', setCssVarColor('palette-grey-400'));
      setColor(palette.StepContent, 'border', setCssVarColor('palette-grey-400'));
      setColor(palette.Switch, 'defaultColor', setCssVarColor('palette-common-white'));
      setColor(palette.Switch, 'defaultDisabledColor', setCssVarColor('palette-grey-100'));
      setColor(palette.Switch, 'primaryDisabledColor', (0, _colorManipulator.private_safeLighten)(palette.primary.main, 0.62));
      setColor(palette.Switch, 'secondaryDisabledColor', (0, _colorManipulator.private_safeLighten)(palette.secondary.main, 0.62));
      setColor(palette.Switch, 'errorDisabledColor', (0, _colorManipulator.private_safeLighten)(palette.error.main, 0.62));
      setColor(palette.Switch, 'infoDisabledColor', (0, _colorManipulator.private_safeLighten)(palette.info.main, 0.62));
      setColor(palette.Switch, 'successDisabledColor', (0, _colorManipulator.private_safeLighten)(palette.success.main, 0.62));
      setColor(palette.Switch, 'warningDisabledColor', (0, _colorManipulator.private_safeLighten)(palette.warning.main, 0.62));
      setColor(palette.TableCell, 'border', (0, _colorManipulator.private_safeLighten)((0, _colorManipulator.private_safeAlpha)(palette.divider, 1), 0.88));
      setColor(palette.Tooltip, 'bg', (0, _colorManipulator.private_safeAlpha)(palette.grey[700], 0.92));
    } else {
      setColor(palette.Alert, 'errorColor', (0, _colorManipulator.private_safeLighten)(palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', (0, _colorManipulator.private_safeLighten)(palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', (0, _colorManipulator.private_safeLighten)(palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', (0, _colorManipulator.private_safeLighten)(palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', setCssVarColor('palette-error-dark'));
      setColor(palette.Alert, 'infoFilledBg', setCssVarColor('palette-info-dark'));
      setColor(palette.Alert, 'successFilledBg', setCssVarColor('palette-success-dark'));
      setColor(palette.Alert, 'warningFilledBg', setCssVarColor('palette-warning-dark'));
      setColor(palette.Alert, 'errorFilledColor', silent(() => darkPalette.getContrastText(palette.error.dark)));
      setColor(palette.Alert, 'infoFilledColor', silent(() => darkPalette.getContrastText(palette.info.dark)));
      setColor(palette.Alert, 'successFilledColor', silent(() => darkPalette.getContrastText(palette.success.dark)));
      setColor(palette.Alert, 'warningFilledColor', silent(() => darkPalette.getContrastText(palette.warning.dark)));
      setColor(palette.Alert, 'errorStandardBg', (0, _colorManipulator.private_safeDarken)(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', (0, _colorManipulator.private_safeDarken)(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', (0, _colorManipulator.private_safeDarken)(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', (0, _colorManipulator.private_safeDarken)(palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', setCssVarColor('palette-error-main'));
      setColor(palette.Alert, 'infoIconColor', setCssVarColor('palette-info-main'));
      setColor(palette.Alert, 'successIconColor', setCssVarColor('palette-success-main'));
      setColor(palette.Alert, 'warningIconColor', setCssVarColor('palette-warning-main'));
      setColor(palette.AppBar, 'defaultBg', setCssVarColor('palette-grey-900'));
      setColor(palette.AppBar, 'darkBg', setCssVarColor('palette-background-paper')); // specific for dark mode
      setColor(palette.AppBar, 'darkColor', setCssVarColor('palette-text-primary')); // specific for dark mode
      setColor(palette.Avatar, 'defaultBg', setCssVarColor('palette-grey-600'));
      setColor(palette.Button, 'inheritContainedBg', setCssVarColor('palette-grey-800'));
      setColor(palette.Button, 'inheritContainedHoverBg', setCssVarColor('palette-grey-700'));
      setColor(palette.Chip, 'defaultBorder', setCssVarColor('palette-grey-700'));
      setColor(palette.Chip, 'defaultAvatarColor', setCssVarColor('palette-grey-300'));
      setColor(palette.Chip, 'defaultIconColor', setCssVarColor('palette-grey-300'));
      setColor(palette.FilledInput, 'bg', 'rgba(255, 255, 255, 0.09)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(255, 255, 255, 0.13)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(255, 255, 255, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', (0, _colorManipulator.private_safeDarken)(palette.primary.main, 0.5));
      setColor(palette.LinearProgress, 'secondaryBg', (0, _colorManipulator.private_safeDarken)(palette.secondary.main, 0.5));
      setColor(palette.LinearProgress, 'errorBg', (0, _colorManipulator.private_safeDarken)(palette.error.main, 0.5));
      setColor(palette.LinearProgress, 'infoBg', (0, _colorManipulator.private_safeDarken)(palette.info.main, 0.5));
      setColor(palette.LinearProgress, 'successBg', (0, _colorManipulator.private_safeDarken)(palette.success.main, 0.5));
      setColor(palette.LinearProgress, 'warningBg', (0, _colorManipulator.private_safeDarken)(palette.warning.main, 0.5));
      setColor(palette.Skeleton, 'bg', `rgba(${setCssVarColor('palette-text-primaryChannel')} / 0.13)`);
      setColor(palette.Slider, 'primaryTrack', (0, _colorManipulator.private_safeDarken)(palette.primary.main, 0.5));
      setColor(palette.Slider, 'secondaryTrack', (0, _colorManipulator.private_safeDarken)(palette.secondary.main, 0.5));
      setColor(palette.Slider, 'errorTrack', (0, _colorManipulator.private_safeDarken)(palette.error.main, 0.5));
      setColor(palette.Slider, 'infoTrack', (0, _colorManipulator.private_safeDarken)(palette.info.main, 0.5));
      setColor(palette.Slider, 'successTrack', (0, _colorManipulator.private_safeDarken)(palette.success.main, 0.5));
      setColor(palette.Slider, 'warningTrack', (0, _colorManipulator.private_safeDarken)(palette.warning.main, 0.5));
      const snackbarContentBackground = (0, _colorManipulator.private_safeEmphasize)(palette.background.default, 0.98);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(palette.SnackbarContent, 'color', silent(() => darkPalette.getContrastText(snackbarContentBackground)));
      setColor(palette.SpeedDialAction, 'fabHoverBg', (0, _colorManipulator.private_safeEmphasize)(palette.background.paper, 0.15));
      setColor(palette.StepConnector, 'border', setCssVarColor('palette-grey-600'));
      setColor(palette.StepContent, 'border', setCssVarColor('palette-grey-600'));
      setColor(palette.Switch, 'defaultColor', setCssVarColor('palette-grey-300'));
      setColor(palette.Switch, 'defaultDisabledColor', setCssVarColor('palette-grey-600'));
      setColor(palette.Switch, 'primaryDisabledColor', (0, _colorManipulator.private_safeDarken)(palette.primary.main, 0.55));
      setColor(palette.Switch, 'secondaryDisabledColor', (0, _colorManipulator.private_safeDarken)(palette.secondary.main, 0.55));
      setColor(palette.Switch, 'errorDisabledColor', (0, _colorManipulator.private_safeDarken)(palette.error.main, 0.55));
      setColor(palette.Switch, 'infoDisabledColor', (0, _colorManipulator.private_safeDarken)(palette.info.main, 0.55));
      setColor(palette.Switch, 'successDisabledColor', (0, _colorManipulator.private_safeDarken)(palette.success.main, 0.55));
      setColor(palette.Switch, 'warningDisabledColor', (0, _colorManipulator.private_safeDarken)(palette.warning.main, 0.55));
      setColor(palette.TableCell, 'border', (0, _colorManipulator.private_safeDarken)((0, _colorManipulator.private_safeAlpha)(palette.divider, 1), 0.68));
      setColor(palette.Tooltip, 'bg', (0, _colorManipulator.private_safeAlpha)(palette.grey[700], 0.92));
    }

    // MUI X - DataGrid needs this token.
    setColorChannel(palette.background, 'default');

    // added for consistency with the `background.default` token
    setColorChannel(palette.background, 'paper');
    setColorChannel(palette.common, 'background');
    setColorChannel(palette.common, 'onBackground');
    setColorChannel(palette, 'divider');
    Object.keys(palette).forEach(color => {
      const colors = palette[color];

      // The default palettes (primary, secondary, error, info, success, and warning) errors are handled by the above `createTheme(...)`.

      if (colors && typeof colors === 'object') {
        // Silent the error for custom palettes.
        if (colors.main) {
          setColor(palette[color], 'mainChannel', (0, _colorManipulator.private_safeColorChannel)(toRgb(colors.main)));
        }
        if (colors.light) {
          setColor(palette[color], 'lightChannel', (0, _colorManipulator.private_safeColorChannel)(toRgb(colors.light)));
        }
        if (colors.dark) {
          setColor(palette[color], 'darkChannel', (0, _colorManipulator.private_safeColorChannel)(toRgb(colors.dark)));
        }
        if (colors.contrastText) {
          setColor(palette[color], 'contrastTextChannel', (0, _colorManipulator.private_safeColorChannel)(toRgb(colors.contrastText)));
        }
        if (color === 'text') {
          // Text colors: text.primary, text.secondary
          setColorChannel(palette[color], 'primary');
          setColorChannel(palette[color], 'secondary');
        }
        if (color === 'action') {
          // Action colors: action.active, action.selected
          if (colors.active) {
            setColorChannel(palette[color], 'active');
          }
          if (colors.selected) {
            setColorChannel(palette[color], 'selected');
          }
        }
      }
    });
  });
  theme = args.reduce((acc, argument) => (0, _deepmerge.default)(acc, argument), theme);
  const parserConfig = {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar
  };
  const {
    vars: themeVars,
    generateCssVars
  } = (0, _system.unstable_prepareCssVars)(theme, parserConfig);
  theme.vars = themeVars;
  theme.generateCssVars = generateCssVars;
  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar;
  theme.unstable_sxConfig = (0, _extends2.default)({}, _styleFunctionSx.unstable_defaultSxConfig, input == null ? void 0 : input.unstable_sxConfig);
  theme.unstable_sx = function sx(props) {
    return (0, _styleFunctionSx.default)({
      sx: props,
      theme: this
    });
  };
  return theme;
}