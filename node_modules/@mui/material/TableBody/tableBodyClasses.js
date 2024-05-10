import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getTableBodyUtilityClass(slot) {
  return generateUtilityClass('MuiTableBody', slot);
}
const tableBodyClasses = generateUtilityClasses('MuiTableBody', ['root']);
export default tableBodyClasses;