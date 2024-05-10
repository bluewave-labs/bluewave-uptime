"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersInputUtilityClass = getPickersInputUtilityClass;
exports.pickersInputClasses = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _PickersInputBase = require("../PickersInputBase");
function getPickersInputUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiPickersFilledInput', slot);
}
const pickersInputClasses = exports.pickersInputClasses = (0, _extends2.default)({}, _PickersInputBase.pickersInputBaseClasses, (0, _generateUtilityClasses.default)('MuiPickersInput', ['root', 'input']));