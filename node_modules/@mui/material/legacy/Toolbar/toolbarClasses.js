import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiToolbar', slot);
}
var toolbarClasses = generateUtilityClasses('MuiToolbar', ['root', 'gutters', 'regular', 'dense']);
export default toolbarClasses;