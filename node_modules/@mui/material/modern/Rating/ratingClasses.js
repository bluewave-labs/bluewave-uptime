import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getRatingUtilityClass(slot) {
  return generateUtilityClass('MuiRating', slot);
}
const ratingClasses = generateUtilityClasses('MuiRating', ['root', 'sizeSmall', 'sizeMedium', 'sizeLarge', 'readOnly', 'disabled', 'focusVisible', 'visuallyHidden', 'pristine', 'label', 'labelEmptyValueActive', 'icon', 'iconEmpty', 'iconFilled', 'iconHover', 'iconFocus', 'iconActive', 'decimal']);
export default ratingClasses;