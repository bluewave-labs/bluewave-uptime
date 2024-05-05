import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getImageListItemUtilityClass(slot) {
  return generateUtilityClass('MuiImageListItem', slot);
}
var imageListItemClasses = generateUtilityClasses('MuiImageListItem', ['root', 'img', 'standard', 'woven', 'masonry', 'quilted']);
export default imageListItemClasses;