"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAlertTitleUtilityClass = getAlertTitleUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getAlertTitleUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiAlertTitle', slot);
}
const alertTitleClasses = (0, _generateUtilityClasses.default)('MuiAlertTitle', ['root']);
var _default = exports.default = alertTitleClasses;