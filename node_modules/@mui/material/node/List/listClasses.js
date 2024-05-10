"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getListUtilityClass = getListUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getListUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiList', slot);
}
const listClasses = (0, _generateUtilityClasses.default)('MuiList', ['root', 'padding', 'dense', 'subheader']);
var _default = exports.default = listClasses;