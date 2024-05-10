import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'TabPanel';
export function getTabPanelUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var tabPanelClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'hidden']);