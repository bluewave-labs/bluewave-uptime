"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getListItemAvatarUtilityClass = getListItemAvatarUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getListItemAvatarUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiListItemAvatar', slot);
}
const listItemAvatarClasses = (0, _generateUtilityClasses.default)('MuiListItemAvatar', ['root', 'alignItemsFlexStart']);
var _default = exports.default = listItemAvatarClasses;