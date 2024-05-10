"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getCardUtilityClass = getCardUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getCardUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiCard', slot);
}
const cardClasses = (0, _generateUtilityClasses.default)('MuiCard', ['root']);
var _default = exports.default = cardClasses;