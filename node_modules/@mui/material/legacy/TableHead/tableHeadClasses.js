import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getTableHeadUtilityClass(slot) {
  return generateUtilityClass('MuiTableHead', slot);
}
var tableHeadClasses = generateUtilityClasses('MuiTableHead', ['root']);
export default tableHeadClasses;