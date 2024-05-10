"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMuiTheme = createMuiTheme;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _formatMuiErrorMessage2 = _interopRequireDefault(require("@mui/utils/formatMuiErrorMessage"));
var _deepmerge = _interopRequireDefault(require("@mui/utils/deepmerge"));
var _styleFunctionSx = _interopRequireWildcard(require("@mui/system/styleFunctionSx"));
var _createTheme = _interopRequireDefault(require("@mui/system/createTheme"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _createMixins = _interopRequireDefault(require("./createMixins"));
var _createPalette = _interopRequireDefault(require("./createPalette"));
var _createTypography = _interopRequireDefault(require("./createTypography"));
var _shadows = _interopRequireDefault(require("./shadows"));
var _createTransitions = _interopRequireDefault(require("./createTransitions"));
var _zIndex = _interopRequireDefault(require("./zIndex"));
const _excluded = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function createTheme(options = {}, ...args) {
  const {
      mixins: mixinsInput = {},
      palette: paletteInput = {},
      transitions: transitionsInput = {},
      typography: typographyInput = {}
    } = options,
    other = (0, _objectWithoutPropertiesLoose2.default)(options, _excluded);
  if (options.vars) {
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: \`vars\` is a private field used for CSS variables support.
Please use another name.` : (0, _formatMuiErrorMessage2.default)(18));
  }
  const palette = (0, _createPalette.default)(paletteInput);
  const systemTheme = (0, _createTheme.default)(options);
  let muiTheme = (0, _deepmerge.default)(systemTheme, {
    mixins: (0, _createMixins.default)(systemTheme.breakpoints, mixinsInput),
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: _shadows.default.slice(),
    typography: (0, _createTypography.default)(palette, typographyInput),
    transitions: (0, _createTransitions.default)(transitionsInput),
    zIndex: (0, _extends2.default)({}, _zIndex.default)
  });
  muiTheme = (0, _deepmerge.default)(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => (0, _deepmerge.default)(acc, argument), muiTheme);
  if (process.env.NODE_ENV !== 'production') {
    // TODO v6: Refactor to use globalStateClassesMapping from @mui/utils once `readOnly` state class is used in Rating component.
    const stateClasses = ['active', 'checked', 'completed', 'disabled', 'error', 'expanded', 'focused', 'focusVisible', 'required', 'selected'];
    const traverse = (node, component) => {
      let key;

      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (key in node) {
        const child = node[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            const stateClass = (0, _generateUtilityClass.default)('', key);
            console.error([`MUI: The \`${component}\` component increases ` + `the CSS specificity of the \`${key}\` internal state.`, 'You can not override it like this: ', JSON.stringify(node, null, 2), '', `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), '', 'https://mui.com/r/state-classes-guide'].join('\n'));
          }
          // Remove the style to prevent global conflicts.
          node[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach(component => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.indexOf('Mui') === 0) {
        traverse(styleOverrides, component);
      }
    });
  }
  muiTheme.unstable_sxConfig = (0, _extends2.default)({}, _styleFunctionSx.unstable_defaultSxConfig, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return (0, _styleFunctionSx.default)({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
let warnedOnce = false;
function createMuiTheme(...args) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(['MUI: the createMuiTheme function was renamed to createTheme.', '', "You should use `import { createTheme } from '@mui/material/styles'`"].join('\n'));
    }
  }
  return createTheme(...args);
}
var _default = exports.default = createTheme;