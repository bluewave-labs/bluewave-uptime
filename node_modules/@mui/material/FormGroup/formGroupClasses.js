import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getFormGroupUtilityClass(slot) {
  return generateUtilityClass('MuiFormGroup', slot);
}
const formGroupClasses = generateUtilityClasses('MuiFormGroup', ['root', 'row', 'error']);
export default formGroupClasses;