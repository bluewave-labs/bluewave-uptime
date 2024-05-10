"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAvatarUtilityClass = getAvatarUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getAvatarUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiAvatar', slot);
}
const avatarClasses = (0, _generateUtilityClasses.default)('MuiAvatar', ['root', 'colorDefault', 'circular', 'rounded', 'square', 'img', 'fallback']);
var _default = exports.default = avatarClasses;