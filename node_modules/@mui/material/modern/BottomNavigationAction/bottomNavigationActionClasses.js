import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getBottomNavigationActionUtilityClass(slot) {
  return generateUtilityClass('MuiBottomNavigationAction', slot);
}
const bottomNavigationActionClasses = generateUtilityClasses('MuiBottomNavigationAction', ['root', 'iconOnly', 'selected', 'label']);
export default bottomNavigationActionClasses;