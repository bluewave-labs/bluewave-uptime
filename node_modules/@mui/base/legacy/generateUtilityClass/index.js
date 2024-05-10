import { globalStateClasses } from '@mui/utils/generateUtilityClass';
var GLOBAL_CLASS_PREFIX = 'base';
function buildStateClass(state) {
  return "".concat(GLOBAL_CLASS_PREFIX, "--").concat(state);
}
function buildSlotClass(componentName, slot) {
  return "".concat(GLOBAL_CLASS_PREFIX, "-").concat(componentName, "-").concat(slot);
}
export function generateUtilityClass(componentName, slot) {
  var globalStateClass = globalStateClasses[slot];
  return globalStateClass ? buildStateClass(globalStateClass) : buildSlotClass(componentName, slot);
}
export function isGlobalState(slot) {
  return globalStateClasses[slot] !== undefined;
}