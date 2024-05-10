import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Select';
export function getSelectUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const selectClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'button', 'listbox', 'popup', 'active', 'expanded', 'disabled', 'focusVisible']);