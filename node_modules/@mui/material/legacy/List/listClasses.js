import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getListUtilityClass(slot) {
  return generateUtilityClass('MuiList', slot);
}
var listClasses = generateUtilityClasses('MuiList', ['root', 'padding', 'dense', 'subheader']);
export default listClasses;