import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
export function getClockUtilityClass(slot) {
  return generateUtilityClass('MuiClock', slot);
}
export const clockClasses = generateUtilityClasses('MuiClock', ['root', 'clock', 'wrapper', 'squareMask', 'pin', 'amButton', 'pmButton', 'meridiemText']);