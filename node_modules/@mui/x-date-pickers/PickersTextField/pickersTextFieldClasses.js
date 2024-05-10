import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getPickersTextFieldUtilityClass(slot) {
  return generateUtilityClass('MuiPickersTextField', slot);
}
export const pickersTextFieldClasses = generateUtilityClasses('MuiPickersTextField', ['root', 'focused', 'disabled', 'error', 'required']);