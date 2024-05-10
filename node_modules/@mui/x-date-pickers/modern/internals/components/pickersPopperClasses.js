import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
export function getPickersPopperUtilityClass(slot) {
  return generateUtilityClass('MuiPickersPopper', slot);
}
export const pickersPopperClasses = generateUtilityClasses('MuiPickersPopper', ['root', 'paper']);