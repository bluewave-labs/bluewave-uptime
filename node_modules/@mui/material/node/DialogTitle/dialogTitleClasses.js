"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getDialogTitleUtilityClass = getDialogTitleUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getDialogTitleUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiDialogTitle', slot);
}
const dialogTitleClasses = (0, _generateUtilityClasses.default)('MuiDialogTitle', ['root']);
var _default = exports.default = dialogTitleClasses;