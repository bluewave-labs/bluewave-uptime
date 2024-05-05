import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'FormControl';
export function getFormControlUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var formControlClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'error', 'filled', 'focused', 'required']);