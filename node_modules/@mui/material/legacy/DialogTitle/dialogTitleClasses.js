import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getDialogTitleUtilityClass(slot) {
  return generateUtilityClass('MuiDialogTitle', slot);
}
var dialogTitleClasses = generateUtilityClasses('MuiDialogTitle', ['root']);
export default dialogTitleClasses;