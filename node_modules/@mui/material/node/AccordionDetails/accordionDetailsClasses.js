"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAccordionDetailsUtilityClass = getAccordionDetailsUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getAccordionDetailsUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiAccordionDetails', slot);
}
const accordionDetailsClasses = (0, _generateUtilityClasses.default)('MuiAccordionDetails', ['root']);
var _default = exports.default = accordionDetailsClasses;