import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Input';
export function getInputUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const inputClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'formControl', 'focused', 'disabled', 'error', 'multiline', 'input', 'inputMultiline', 'inputTypeSearch', 'adornedStart', 'adornedEnd']);