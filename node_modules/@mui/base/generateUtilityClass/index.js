import { globalStateClasses } from '@mui/utils/generateUtilityClass';
const GLOBAL_CLASS_PREFIX = 'base';
function buildStateClass(state) {
  return `${GLOBAL_CLASS_PREFIX}--${state}`;
}
function buildSlotClass(componentName, slot) {
  return `${GLOBAL_CLASS_PREFIX}-${componentName}-${slot}`;
}
export function generateUtilityClass(componentName, slot) {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? buildStateClass(globalStateClass) : buildSlotClass(componentName, slot);
}
export function isGlobalState(slot) {
  return globalStateClasses[slot] !== undefined;
}