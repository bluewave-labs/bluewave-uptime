"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersSectionListUtilityClass = getPickersSectionListUtilityClass;
exports.pickersSectionListClasses = void 0;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getPickersSectionListUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiPickersSectionList', slot);
}
const pickersSectionListClasses = exports.pickersSectionListClasses = (0, _generateUtilityClasses.default)('MuiPickersSectionList', ['root', 'section', 'sectionContent']);