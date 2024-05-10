import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getPickersInputBaseUtilityClass(slot) {
  return generateUtilityClass('MuiPickersInputBase', slot);
}
export const pickersInputBaseClasses = generateUtilityClasses('MuiPickersInputBase', ['root', 'focused', 'disabled', 'error', 'notchedOutline', 'sectionContent', 'sectionBefore', 'sectionAfter', 'adornedStart', 'adornedEnd', 'input']);