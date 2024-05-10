"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getBottomNavigationActionUtilityClass = getBottomNavigationActionUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getBottomNavigationActionUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiBottomNavigationAction', slot);
}
const bottomNavigationActionClasses = (0, _generateUtilityClasses.default)('MuiBottomNavigationAction', ['root', 'iconOnly', 'selected', 'label']);
var _default = exports.default = bottomNavigationActionClasses;