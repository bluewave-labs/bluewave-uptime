"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getFormHelperTextUtilityClasses = getFormHelperTextUtilityClasses;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getFormHelperTextUtilityClasses(slot) {
  return (0, _generateUtilityClass.default)('MuiFormHelperText', slot);
}
const formHelperTextClasses = (0, _generateUtilityClasses.default)('MuiFormHelperText', ['root', 'error', 'disabled', 'sizeSmall', 'sizeMedium', 'contained', 'focused', 'filled', 'required']);
var _default = exports.default = formHelperTextClasses;