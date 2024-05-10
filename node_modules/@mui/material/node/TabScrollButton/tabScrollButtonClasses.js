"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTabScrollButtonUtilityClass = getTabScrollButtonUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTabScrollButtonUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTabScrollButton', slot);
}
const tabScrollButtonClasses = (0, _generateUtilityClasses.default)('MuiTabScrollButton', ['root', 'vertical', 'horizontal', 'disabled']);
var _default = exports.default = tabScrollButtonClasses;