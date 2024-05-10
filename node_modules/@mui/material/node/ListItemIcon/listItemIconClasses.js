"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getListItemIconUtilityClass = getListItemIconUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getListItemIconUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiListItemIcon', slot);
}
const listItemIconClasses = (0, _generateUtilityClasses.default)('MuiListItemIcon', ['root', 'alignItemsFlexStart']);
var _default = exports.default = listItemIconClasses;