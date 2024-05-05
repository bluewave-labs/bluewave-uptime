import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Switch';
export function getSwitchUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var switchClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'input', 'track', 'thumb', 'checked', 'disabled', 'focusVisible', 'readOnly']);