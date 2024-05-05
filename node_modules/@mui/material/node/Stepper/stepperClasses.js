"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getStepperUtilityClass = getStepperUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getStepperUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiStepper', slot);
}
const stepperClasses = (0, _generateUtilityClasses.default)('MuiStepper', ['root', 'horizontal', 'vertical', 'alternativeLabel']);
var _default = exports.default = stepperClasses;