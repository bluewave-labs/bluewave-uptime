import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Snackbar';
export function getSnackbarUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const snackbarClasses = generateUtilityClasses(COMPONENT_NAME, ['root']);