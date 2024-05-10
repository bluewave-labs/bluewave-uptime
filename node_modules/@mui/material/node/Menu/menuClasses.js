"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getMenuUtilityClass = getMenuUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getMenuUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiMenu', slot);
}
const menuClasses = (0, _generateUtilityClasses.default)('MuiMenu', ['root', 'paper', 'list']);
var _default = exports.default = menuClasses;