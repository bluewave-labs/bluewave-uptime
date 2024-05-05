import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getTableRowUtilityClass(slot) {
  return generateUtilityClass('MuiTableRow', slot);
}
const tableRowClasses = generateUtilityClasses('MuiTableRow', ['root', 'selected', 'hover', 'head', 'footer']);
export default tableRowClasses;