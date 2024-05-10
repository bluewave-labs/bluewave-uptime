"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getCardHeaderUtilityClass = getCardHeaderUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getCardHeaderUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiCardHeader', slot);
}
const cardHeaderClasses = (0, _generateUtilityClasses.default)('MuiCardHeader', ['root', 'avatar', 'action', 'content', 'title', 'subheader']);
var _default = exports.default = cardHeaderClasses;