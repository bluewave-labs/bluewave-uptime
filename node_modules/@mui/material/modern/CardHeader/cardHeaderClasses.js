import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getCardHeaderUtilityClass(slot) {
  return generateUtilityClass('MuiCardHeader', slot);
}
const cardHeaderClasses = generateUtilityClasses('MuiCardHeader', ['root', 'avatar', 'action', 'content', 'title', 'subheader']);
export default cardHeaderClasses;