"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateUtilityClass;
exports.globalStateClasses = void 0;
exports.isGlobalState = isGlobalState;
var _ClassNameGenerator = _interopRequireDefault(require("../ClassNameGenerator"));
const globalStateClasses = exports.globalStateClasses = {
  active: 'active',
  checked: 'checked',
  completed: 'completed',
  disabled: 'disabled',
  error: 'error',
  expanded: 'expanded',
  focused: 'focused',
  focusVisible: 'focusVisible',
  open: 'open',
  readOnly: 'readOnly',
  required: 'required',
  selected: 'selected'
};
function generateUtilityClass(componentName, slot, globalStatePrefix = 'Mui') {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${_ClassNameGenerator.default.generate(componentName)}-${slot}`;
}
function isGlobalState(slot) {
  return globalStateClasses[slot] !== undefined;
}