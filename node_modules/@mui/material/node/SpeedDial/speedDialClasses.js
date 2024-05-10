"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getSpeedDialUtilityClass = getSpeedDialUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getSpeedDialUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiSpeedDial', slot);
}
const speedDialClasses = (0, _generateUtilityClasses.default)('MuiSpeedDial', ['root', 'fab', 'directionUp', 'directionDown', 'directionLeft', 'directionRight', 'actions', 'actionsClosed']);
var _default = exports.default = speedDialClasses;