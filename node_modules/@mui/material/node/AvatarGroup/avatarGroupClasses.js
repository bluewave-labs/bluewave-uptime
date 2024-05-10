"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAvatarGroupUtilityClass = getAvatarGroupUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getAvatarGroupUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiAvatarGroup', slot);
}
const avatarGroupClasses = (0, _generateUtilityClasses.default)('MuiAvatarGroup', ['root', 'avatar']);
var _default = exports.default = avatarGroupClasses;