import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _formatMuiErrorMessage from "@mui/utils/formatMuiErrorMessage";
import deepmerge from '@mui/utils/deepmerge';
import styleFunctionSx, { unstable_defaultSxConfig as defaultSxConfig } from '@mui/system/styleFunctionSx';
import systemCreateTheme from '@mui/system/createTheme';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import createMixins from './createMixins';
import createPalette from './createPalette';
import createTypography from './createTypography';
import shadows from './shadows';
import createTransitions from './createTransitions';
import zIndex from './zIndex';
function createTheme() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var breakpointsInput = options.breakpoints,
    _options$mixins = options.mixins,
    mixinsInput = _options$mixins === void 0 ? {} : _options$mixins,
    spacingInput = options.spacing,
    _options$palette = options.palette,
    paletteInput = _options$palette === void 0 ? {} : _options$palette,
    _options$transitions = options.transitions,
    transitionsInput = _options$transitions === void 0 ? {} : _options$transitions,
    _options$typography = options.typography,
    typographyInput = _options$typography === void 0 ? {} : _options$typography,
    shapeInput = options.shape,
    other = _objectWithoutProperties(options, ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"]);
  if (options.vars) {
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : _formatMuiErrorMessage(18));
  }
  var palette = createPalette(paletteInput);
  var systemTheme = systemCreateTheme(options);
  var muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette: palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows.slice(),
    typography: createTypography(palette, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex)
  });
  muiTheme = deepmerge(muiTheme, other);
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  muiTheme = args.reduce(function (acc, argument) {
    return deepmerge(acc, argument);
  }, muiTheme);
  if (process.env.NODE_ENV !== 'production') {
    // TODO v6: Refactor to use globalStateClassesMapping from @mui/utils once `readOnly` state class is used in Rating component.
    var stateClasses = ['active', 'checked', 'completed', 'disabled', 'error', 'expanded', 'focused', 'focusVisible', 'required', 'selected'];
    var traverse = function traverse(node, component) {
      var key;

      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (key in node) {
        var child = node[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            var stateClass = generateUtilityClass('', key);
            console.error(["MUI: The `".concat(component, "` component increases ") + "the CSS specificity of the `".concat(key, "` internal state."), 'You can not override it like this: ', JSON.stringify(node, null, 2), '', "Instead, you need to use the '&.".concat(stateClass, "' syntax:"), JSON.stringify({
              root: _defineProperty({}, "&.".concat(stateClass), child)
            }, null, 2), '', 'https://mui.com/r/state-classes-guide'].join('\n'));
          }
          // Remove the style to prevent global conflicts.
          node[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach(function (component) {
      var styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.indexOf('Mui') === 0) {
        traverse(styleOverrides, component);
      }
    });
  }
  muiTheme.unstable_sxConfig = _extends({}, defaultSxConfig, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
var warnedOnce = false;
export function createMuiTheme() {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(['MUI: the createMuiTheme function was renamed to createTheme.', '', "You should use `import { createTheme } from '@mui/material/styles'`"].join('\n'));
    }
  }
  return createTheme.apply(void 0, arguments);
}
export default createTheme;