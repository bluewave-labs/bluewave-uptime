"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getSwitchBaseUtilityClass = getSwitchBaseUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getSwitchBaseUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('PrivateSwitchBase', slot);
}
const switchBaseClasses = (0, _generateUtilityClasses.default)('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
var _default = exports.default = switchBaseClasses;