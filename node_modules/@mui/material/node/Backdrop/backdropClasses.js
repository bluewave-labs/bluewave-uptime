"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getBackdropUtilityClass = getBackdropUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getBackdropUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiBackdrop', slot);
}
const backdropClasses = (0, _generateUtilityClasses.default)('MuiBackdrop', ['root', 'invisible']);
var _default = exports.default = backdropClasses;