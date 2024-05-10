"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getNativeSelectUtilityClasses = getNativeSelectUtilityClasses;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getNativeSelectUtilityClasses(slot) {
  return (0, _generateUtilityClass.default)('MuiNativeSelect', slot);
}
const nativeSelectClasses = (0, _generateUtilityClasses.default)('MuiNativeSelect', ['root', 'select', 'multiple', 'filled', 'outlined', 'standard', 'disabled', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'iconStandard', 'nativeInput', 'error']);
var _default = exports.default = nativeSelectClasses;