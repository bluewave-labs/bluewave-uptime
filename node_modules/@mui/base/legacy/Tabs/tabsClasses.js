import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Tabs';
export function getTabsUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var tabsClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'horizontal', 'vertical']);