"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getCollapseUtilityClass = getCollapseUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getCollapseUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiCollapse', slot);
}
const collapseClasses = (0, _generateUtilityClasses.default)('MuiCollapse', ['root', 'horizontal', 'vertical', 'entered', 'hidden', 'wrapper', 'wrapperInner']);
var _default = exports.default = collapseClasses;