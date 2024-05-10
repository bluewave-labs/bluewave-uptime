import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'TabsList';
export function getTabsListUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var tabsListClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'horizontal', 'vertical']);