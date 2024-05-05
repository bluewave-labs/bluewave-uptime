"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getListItemSecondaryActionClassesUtilityClass = getListItemSecondaryActionClassesUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getListItemSecondaryActionClassesUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiListItemSecondaryAction', slot);
}
const listItemSecondaryActionClasses = (0, _generateUtilityClasses.default)('MuiListItemSecondaryAction', ['root', 'disableGutters']);
var _default = exports.default = listItemSecondaryActionClasses;