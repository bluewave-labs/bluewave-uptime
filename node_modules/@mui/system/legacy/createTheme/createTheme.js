import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import deepmerge from '@mui/utils/deepmerge';
import createBreakpoints from './createBreakpoints';
import shape from './shape';
import createSpacing from './createSpacing';
import styleFunctionSx from '../styleFunctionSx/styleFunctionSx';
import defaultSxConfig from '../styleFunctionSx/defaultSxConfig';
import applyStyles from './applyStyles';
function createTheme() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$breakpoints = options.breakpoints,
    breakpointsInput = _options$breakpoints === void 0 ? {} : _options$breakpoints,
    _options$palette = options.palette,
    paletteInput = _options$palette === void 0 ? {} : _options$palette,
    spacingInput = options.spacing,
    _options$shape = options.shape,
    shapeInput = _options$shape === void 0 ? {} : _options$shape,
    other = _objectWithoutProperties(options, ["breakpoints", "palette", "spacing", "shape"]);
  var breakpoints = createBreakpoints(breakpointsInput);
  var spacing = createSpacing(spacingInput);
  var muiTheme = deepmerge({
    breakpoints: breakpoints,
    direction: 'ltr',
    components: {},
    // Inject component definitions.
    palette: _extends({
      mode: 'light'
    }, paletteInput),
    spacing: spacing,
    shape: _extends({}, shape, shapeInput)
  }, other);
  muiTheme.applyStyles = applyStyles;
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  muiTheme = args.reduce(function (acc, argument) {
    return deepmerge(acc, argument);
  }, muiTheme);
  muiTheme.unstable_sxConfig = _extends({}, defaultSxConfig, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
export default createTheme;