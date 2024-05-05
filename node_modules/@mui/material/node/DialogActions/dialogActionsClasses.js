"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getDialogActionsUtilityClass = getDialogActionsUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getDialogActionsUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiDialogActions', slot);
}
const dialogActionsClasses = (0, _generateUtilityClasses.default)('MuiDialogActions', ['root', 'spacing']);
var _default = exports.default = dialogActionsClasses;