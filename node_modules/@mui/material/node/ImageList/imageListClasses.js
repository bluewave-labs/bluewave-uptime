"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getImageListUtilityClass = getImageListUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getImageListUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiImageList', slot);
}
const imageListClasses = (0, _generateUtilityClasses.default)('MuiImageList', ['root', 'masonry', 'quilted', 'standard', 'woven']);
var _default = exports.default = imageListClasses;