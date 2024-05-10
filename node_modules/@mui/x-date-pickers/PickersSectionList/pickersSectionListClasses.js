import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getPickersSectionListUtilityClass(slot) {
  return generateUtilityClass('MuiPickersSectionList', slot);
}
export const pickersSectionListClasses = generateUtilityClasses('MuiPickersSectionList', ['root', 'section', 'sectionContent']);