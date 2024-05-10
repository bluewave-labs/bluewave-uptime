"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getStepUtilityClass = getStepUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getStepUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiStep', slot);
}
const stepClasses = (0, _generateUtilityClasses.default)('MuiStep', ['root', 'horizontal', 'vertical', 'alternativeLabel', 'completed']);
var _default = exports.default = stepClasses;