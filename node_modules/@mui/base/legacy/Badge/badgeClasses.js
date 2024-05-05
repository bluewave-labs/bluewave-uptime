import { generateUtilityClasses } from '../generateUtilityClasses';
import { generateUtilityClass } from '../generateUtilityClass';
var COMPONENT_NAME = 'Badge';
export function getBadgeUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var badgeClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'badge', 'invisible']);