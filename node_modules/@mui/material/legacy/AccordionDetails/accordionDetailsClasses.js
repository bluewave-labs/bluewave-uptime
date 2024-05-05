import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getAccordionDetailsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionDetails', slot);
}
var accordionDetailsClasses = generateUtilityClasses('MuiAccordionDetails', ['root']);
export default accordionDetailsClasses;