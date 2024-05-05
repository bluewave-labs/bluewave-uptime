import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getStepUtilityClass(slot) {
  return generateUtilityClass('MuiStep', slot);
}
const stepClasses = generateUtilityClasses('MuiStep', ['root', 'horizontal', 'vertical', 'alternativeLabel', 'completed']);
export default stepClasses;