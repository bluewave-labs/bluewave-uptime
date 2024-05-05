"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getDialogContentTextUtilityClass = getDialogContentTextUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getDialogContentTextUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiDialogContentText', slot);
}
const dialogContentTextClasses = (0, _generateUtilityClasses.default)('MuiDialogContentText', ['root']);
var _default = exports.default = dialogContentTextClasses;