"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getFormGroupUtilityClass = getFormGroupUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getFormGroupUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiFormGroup', slot);
}
const formGroupClasses = (0, _generateUtilityClasses.default)('MuiFormGroup', ['root', 'row', 'error']);
var _default = exports.default = formGroupClasses;