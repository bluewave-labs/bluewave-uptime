"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getImageListItemUtilityClass = getImageListItemUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getImageListItemUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiImageListItem', slot);
}
const imageListItemClasses = (0, _generateUtilityClasses.default)('MuiImageListItem', ['root', 'img', 'standard', 'woven', 'masonry', 'quilted']);
var _default = exports.default = imageListItemClasses;