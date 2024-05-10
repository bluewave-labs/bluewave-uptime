"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersTextFieldUtilityClass = getPickersTextFieldUtilityClass;
exports.pickersTextFieldClasses = void 0;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getPickersTextFieldUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiPickersTextField', slot);
}
const pickersTextFieldClasses = exports.pickersTextFieldClasses = (0, _generateUtilityClasses.default)('MuiPickersTextField', ['root', 'focused', 'disabled', 'error', 'required']);