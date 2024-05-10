import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'TabPanel';
export function getTabPanelUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const tabPanelClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'hidden']);