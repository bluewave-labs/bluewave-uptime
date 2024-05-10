import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'OptionGroup';
export function getOptionGroupUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const optionGroupClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'label', 'list']);