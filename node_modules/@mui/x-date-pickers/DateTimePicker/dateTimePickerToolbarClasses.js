import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
export function getDateTimePickerToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiDateTimePickerToolbar', slot);
}
export const dateTimePickerToolbarClasses = generateUtilityClasses('MuiDateTimePickerToolbar', ['root', 'dateContainer', 'timeContainer', 'timeDigitsContainer', 'separator', 'timeLabelReverse', 'ampmSelection', 'ampmLandscape', 'ampmLabel']);