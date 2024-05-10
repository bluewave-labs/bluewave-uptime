"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getCardActionsUtilityClass = getCardActionsUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getCardActionsUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiCardActions', slot);
}
const cardActionsClasses = (0, _generateUtilityClasses.default)('MuiCardActions', ['root', 'spacing']);
var _default = exports.default = cardActionsClasses;