"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getStepLabelUtilityClass = getStepLabelUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getStepLabelUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiStepLabel', slot);
}
const stepLabelClasses = (0, _generateUtilityClasses.default)('MuiStepLabel', ['root', 'horizontal', 'vertical', 'label', 'active', 'completed', 'error', 'disabled', 'iconContainer', 'alternativeLabel', 'labelContainer']);
var _default = exports.default = stepLabelClasses;