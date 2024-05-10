"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTextFieldUtilityClass = getTextFieldUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTextFieldUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTextField', slot);
}
const textFieldClasses = (0, _generateUtilityClasses.default)('MuiTextField', ['root']);
var _default = exports.default = textFieldClasses;