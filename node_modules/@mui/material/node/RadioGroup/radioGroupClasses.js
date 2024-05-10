"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getRadioGroupUtilityClass = getRadioGroupUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getRadioGroupUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiRadioGroup', slot);
}
const radioGroupClasses = (0, _generateUtilityClasses.default)('MuiRadioGroup', ['root', 'row', 'error']);
var _default = exports.default = radioGroupClasses;