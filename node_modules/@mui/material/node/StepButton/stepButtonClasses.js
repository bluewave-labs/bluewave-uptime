"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getStepButtonUtilityClass = getStepButtonUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getStepButtonUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiStepButton', slot);
}
const stepButtonClasses = (0, _generateUtilityClasses.default)('MuiStepButton', ['root', 'horizontal', 'vertical', 'touchRipple']);
var _default = exports.default = stepButtonClasses;