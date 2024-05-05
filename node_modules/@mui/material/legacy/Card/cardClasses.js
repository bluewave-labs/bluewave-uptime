import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getCardUtilityClass(slot) {
  return generateUtilityClass('MuiCard', slot);
}
var cardClasses = generateUtilityClasses('MuiCard', ['root']);
export default cardClasses;