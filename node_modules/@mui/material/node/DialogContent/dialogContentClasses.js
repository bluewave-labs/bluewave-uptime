"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getDialogContentUtilityClass = getDialogContentUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getDialogContentUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiDialogContent', slot);
}
const dialogContentClasses = (0, _generateUtilityClasses.default)('MuiDialogContent', ['root', 'dividers']);
var _default = exports.default = dialogContentClasses;