"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAccordionUtilityClass = getAccordionUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getAccordionUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiAccordion', slot);
}
const accordionClasses = (0, _generateUtilityClasses.default)('MuiAccordion', ['root', 'rounded', 'expanded', 'disabled', 'gutters', 'region']);
var _default = exports.default = accordionClasses;