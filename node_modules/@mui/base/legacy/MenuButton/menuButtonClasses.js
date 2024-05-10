import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'MenuButton';
export function getMenuButtonUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var menuButtonClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'active', 'disabled', 'expanded']);