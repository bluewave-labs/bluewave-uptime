import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
export function getPickersMonthUtilityClass(slot) {
  return generateUtilityClass('MuiPickersMonth', slot);
}
export const pickersMonthClasses = generateUtilityClasses('MuiPickersMonth', ['root', 'monthButton', 'disabled', 'selected']);