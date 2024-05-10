import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
export function getTimeClockUtilityClass(slot) {
  return generateUtilityClass('MuiTimeClock', slot);
}
export const timeClockClasses = generateUtilityClasses('MuiTimeClock', ['root', 'arrowSwitcher']);