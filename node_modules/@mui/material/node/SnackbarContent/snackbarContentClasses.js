"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getSnackbarContentUtilityClass = getSnackbarContentUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getSnackbarContentUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiSnackbarContent', slot);
}
const snackbarContentClasses = (0, _generateUtilityClasses.default)('MuiSnackbarContent', ['root', 'message', 'action']);
var _default = exports.default = snackbarContentClasses;