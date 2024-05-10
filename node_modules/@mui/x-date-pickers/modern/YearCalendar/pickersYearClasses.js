import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
export function getPickersYearUtilityClass(slot) {
  return generateUtilityClass('MuiPickersYear', slot);
}
export const pickersYearClasses = generateUtilityClasses('MuiPickersYear', ['root', 'yearButton', 'selected', 'disabled']);