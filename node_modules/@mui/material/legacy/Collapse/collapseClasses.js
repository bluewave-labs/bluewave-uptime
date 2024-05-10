import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getCollapseUtilityClass(slot) {
  return generateUtilityClass('MuiCollapse', slot);
}
var collapseClasses = generateUtilityClasses('MuiCollapse', ['root', 'horizontal', 'vertical', 'entered', 'hidden', 'wrapper', 'wrapperInner']);
export default collapseClasses;