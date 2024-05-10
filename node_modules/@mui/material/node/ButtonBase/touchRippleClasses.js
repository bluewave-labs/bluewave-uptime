"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTouchRippleUtilityClass = getTouchRippleUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTouchRippleUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTouchRipple', slot);
}
const touchRippleClasses = (0, _generateUtilityClasses.default)('MuiTouchRipple', ['root', 'ripple', 'rippleVisible', 'ripplePulsate', 'child', 'childLeaving', 'childPulsate']);
var _default = exports.default = touchRippleClasses;