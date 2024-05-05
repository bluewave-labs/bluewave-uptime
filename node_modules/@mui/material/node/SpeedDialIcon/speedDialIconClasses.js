"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getSpeedDialIconUtilityClass = getSpeedDialIconUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getSpeedDialIconUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiSpeedDialIcon', slot);
}
const speedDialIconClasses = (0, _generateUtilityClasses.default)('MuiSpeedDialIcon', ['root', 'icon', 'iconOpen', 'iconWithOpenIconOpen', 'openIcon', 'openIconOpen']);
var _default = exports.default = speedDialIconClasses;