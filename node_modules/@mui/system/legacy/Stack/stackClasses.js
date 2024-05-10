import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getStackUtilityClass(slot) {
  return generateUtilityClass('MuiStack', slot);
}
var stackClasses = generateUtilityClasses('MuiStack', ['root']);
export default stackClasses;