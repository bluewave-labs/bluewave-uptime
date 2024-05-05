import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getListItemTextUtilityClass(slot) {
  return generateUtilityClass('MuiListItemText', slot);
}
var listItemTextClasses = generateUtilityClasses('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']);
export default listItemTextClasses;