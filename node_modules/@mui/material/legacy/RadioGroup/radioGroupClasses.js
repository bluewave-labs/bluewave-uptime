import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getRadioGroupUtilityClass(slot) {
  return generateUtilityClass('MuiRadioGroup', slot);
}
var radioGroupClasses = generateUtilityClasses('MuiRadioGroup', ['root', 'row', 'error']);
export default radioGroupClasses;