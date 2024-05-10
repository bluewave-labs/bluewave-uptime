import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Snackbar';
export function getSnackbarUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var snackbarClasses = generateUtilityClasses(COMPONENT_NAME, ['root']);