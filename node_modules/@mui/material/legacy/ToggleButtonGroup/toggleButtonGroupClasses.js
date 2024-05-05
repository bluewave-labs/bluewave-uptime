import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getToggleButtonGroupUtilityClass(slot) {
  return generateUtilityClass('MuiToggleButtonGroup', slot);
}
var toggleButtonGroupClasses = generateUtilityClasses('MuiToggleButtonGroup', ['root', 'selected', 'vertical', 'disabled', 'grouped', 'groupedHorizontal', 'groupedVertical', 'fullWidth', 'firstButton', 'lastButton', 'middleButton']);
export default toggleButtonGroupClasses;