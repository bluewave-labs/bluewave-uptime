import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getStepButtonUtilityClass(slot) {
  return generateUtilityClass('MuiStepButton', slot);
}
var stepButtonClasses = generateUtilityClasses('MuiStepButton', ['root', 'horizontal', 'vertical', 'touchRipple']);
export default stepButtonClasses;