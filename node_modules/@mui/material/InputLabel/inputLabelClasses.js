import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getInputLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiInputLabel', slot);
}
const inputLabelClasses = generateUtilityClasses('MuiInputLabel', ['root', 'focused', 'disabled', 'error', 'required', 'asterisk', 'formControl', 'sizeSmall', 'shrink', 'animated', 'standard', 'filled', 'outlined']);
export default inputLabelClasses;