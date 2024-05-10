import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Popup';
export function getPopupUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const popupClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'open']);