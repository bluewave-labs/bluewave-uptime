import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Option';
export function getOptionUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const optionClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'selected', 'highlighted']);