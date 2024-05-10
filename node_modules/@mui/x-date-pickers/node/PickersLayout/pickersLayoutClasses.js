"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersLayoutUtilityClass = getPickersLayoutUtilityClass;
exports.pickersLayoutClasses = void 0;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getPickersLayoutUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiPickersLayout', slot);
}
const pickersLayoutClasses = exports.pickersLayoutClasses = (0, _generateUtilityClasses.default)('MuiPickersLayout', ['root', 'landscape', 'contentWrapper', 'toolbar', 'actionBar', 'tabs', 'shortcuts']);