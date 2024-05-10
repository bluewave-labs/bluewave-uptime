import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getAccordionUtilityClass(slot) {
  return generateUtilityClass('MuiAccordion', slot);
}
var accordionClasses = generateUtilityClasses('MuiAccordion', ['root', 'rounded', 'expanded', 'disabled', 'gutters', 'region']);
export default accordionClasses;