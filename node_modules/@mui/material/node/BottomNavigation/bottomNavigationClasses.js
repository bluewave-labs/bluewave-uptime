"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getBottomNavigationUtilityClass = getBottomNavigationUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getBottomNavigationUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiBottomNavigation', slot);
}
const bottomNavigationClasses = (0, _generateUtilityClasses.default)('MuiBottomNavigation', ['root']);
var _default = exports.default = bottomNavigationClasses;