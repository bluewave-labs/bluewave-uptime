import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Tabs';
export function getTabsUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const tabsClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'horizontal', 'vertical']);