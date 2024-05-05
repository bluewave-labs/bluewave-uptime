import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getDialogContentUtilityClass(slot) {
  return generateUtilityClass('MuiDialogContent', slot);
}
var dialogContentClasses = generateUtilityClasses('MuiDialogContent', ['root', 'dividers']);
export default dialogContentClasses;