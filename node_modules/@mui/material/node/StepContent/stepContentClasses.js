"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getStepContentUtilityClass = getStepContentUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getStepContentUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiStepContent', slot);
}
const stepContentClasses = (0, _generateUtilityClasses.default)('MuiStepContent', ['root', 'last', 'transition']);
var _default = exports.default = stepContentClasses;