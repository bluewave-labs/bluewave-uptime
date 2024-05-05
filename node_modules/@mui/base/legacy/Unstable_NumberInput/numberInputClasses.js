import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'NumberInput';
export function getNumberInputUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var numberInputClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'formControl', 'focused', 'disabled', 'readOnly', 'error', 'input', 'incrementButton', 'decrementButton', 'adornedStart', 'adornedEnd']);