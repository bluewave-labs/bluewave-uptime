import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getTextFieldUtilityClass(slot) {
  return generateUtilityClass('MuiTextField', slot);
}
var textFieldClasses = generateUtilityClasses('MuiTextField', ['root']);
export default textFieldClasses;