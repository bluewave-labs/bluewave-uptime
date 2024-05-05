import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'TablePagination';
export function getTablePaginationUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const tablePaginationClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'toolbar', 'spacer', 'selectLabel', 'selectRoot', 'select', 'selectIcon', 'input', 'menuItem', 'displayedRows', 'actions']);