"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getStackUtilityClass = getStackUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getStackUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiStack', slot);
}
const stackClasses = (0, _generateUtilityClasses.default)('MuiStack', ['root']);
var _default = exports.default = stackClasses;