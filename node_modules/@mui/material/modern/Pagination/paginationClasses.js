import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getPaginationUtilityClass(slot) {
  return generateUtilityClass('MuiPagination', slot);
}
const paginationClasses = generateUtilityClasses('MuiPagination', ['root', 'ul', 'outlined', 'text']);
export default paginationClasses;