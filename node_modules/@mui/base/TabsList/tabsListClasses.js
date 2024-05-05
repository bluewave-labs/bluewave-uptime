import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'TabsList';
export function getTabsListUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const tabsListClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'horizontal', 'vertical']);