import { generateUtilityClasses } from '../generateUtilityClasses';
import { generateUtilityClass } from '../generateUtilityClass';
const COMPONENT_NAME = 'Badge';
export function getBadgeUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const badgeClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'badge', 'invisible']);