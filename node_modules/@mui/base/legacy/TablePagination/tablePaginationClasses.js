import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'TablePagination';
export function getTablePaginationUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var tablePaginationClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'toolbar', 'spacer', 'selectLabel', 'selectRoot', 'select', 'selectIcon', 'input', 'menuItem', 'displayedRows', 'actions']);