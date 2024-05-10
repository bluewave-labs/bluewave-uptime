import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Button';
export function getButtonUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var buttonClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'active', 'disabled', 'focusVisible']);