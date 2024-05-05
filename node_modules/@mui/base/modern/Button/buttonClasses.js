import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Button';
export function getButtonUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const buttonClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'active', 'disabled', 'focusVisible']);