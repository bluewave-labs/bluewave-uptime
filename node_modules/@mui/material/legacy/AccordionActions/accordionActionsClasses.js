import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getAccordionActionsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionActions', slot);
}
var accordionActionsClasses = generateUtilityClasses('MuiAccordionActions', ['root', 'spacing']);
export default accordionActionsClasses;