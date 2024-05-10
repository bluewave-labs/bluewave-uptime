import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'OptionGroup';
export function getOptionGroupUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var optionGroupClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'label', 'list']);