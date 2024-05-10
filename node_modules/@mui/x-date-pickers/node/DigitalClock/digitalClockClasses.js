"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.digitalClockClasses = void 0;
exports.getDigitalClockUtilityClass = getDigitalClockUtilityClass;
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
function getDigitalClockUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiDigitalClock', slot);
}
const digitalClockClasses = exports.digitalClockClasses = (0, _generateUtilityClasses.default)('MuiDigitalClock', ['root', 'list', 'item']);