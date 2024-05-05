import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getAlertTitleUtilityClass(slot) {
  return generateUtilityClass('MuiAlertTitle', slot);
}
var alertTitleClasses = generateUtilityClasses('MuiAlertTitle', ['root']);
export default alertTitleClasses;