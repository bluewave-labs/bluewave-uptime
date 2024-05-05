"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getStepIconUtilityClass = getStepIconUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getStepIconUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiStepIcon', slot);
}
const stepIconClasses = (0, _generateUtilityClasses.default)('MuiStepIcon', ['root', 'active', 'completed', 'error', 'text']);
var _default = exports.default = stepIconClasses;