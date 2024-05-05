import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'MenuButton';
export function getMenuButtonUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const menuButtonClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'active', 'disabled', 'expanded']);