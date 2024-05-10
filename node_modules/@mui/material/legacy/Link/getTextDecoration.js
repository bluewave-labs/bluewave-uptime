import { getPath } from '@mui/system';
import { alpha } from '@mui/system/colorManipulator';
export var colorTransformations = {
  primary: 'primary.main',
  textPrimary: 'text.primary',
  secondary: 'secondary.main',
  textSecondary: 'text.secondary',
  error: 'error.main'
};
var transformDeprecatedColors = function transformDeprecatedColors(color) {
  return colorTransformations[color] || color;
};
var getTextDecoration = function getTextDecoration(_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var transformedColor = transformDeprecatedColors(ownerState.color);
  var color = getPath(theme, "palette.".concat(transformedColor), false) || ownerState.color;
  var channelColor = getPath(theme, "palette.".concat(transformedColor, "Channel"));
  if ('vars' in theme && channelColor) {
    return "rgba(".concat(channelColor, " / 0.4)");
  }
  return alpha(color, 0.4);
};
export default getTextDecoration;