import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Popup';
export function getPopupUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var popupClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'open']);