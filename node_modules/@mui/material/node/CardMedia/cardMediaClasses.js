"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getCardMediaUtilityClass = getCardMediaUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getCardMediaUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiCardMedia', slot);
}
const cardMediaClasses = (0, _generateUtilityClasses.default)('MuiCardMedia', ['root', 'media', 'img']);
var _default = exports.default = cardMediaClasses;