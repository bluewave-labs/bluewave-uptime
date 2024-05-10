"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getModalUtilityClass = getModalUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getModalUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiModal', slot);
}
const modalClasses = (0, _generateUtilityClasses.default)('MuiModal', ['root', 'hidden', 'backdrop']);
var _default = exports.default = modalClasses;