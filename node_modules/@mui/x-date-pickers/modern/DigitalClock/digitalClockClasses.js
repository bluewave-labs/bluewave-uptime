import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
export function getDigitalClockUtilityClass(slot) {
  return generateUtilityClass('MuiDigitalClock', slot);
}
export const digitalClockClasses = generateUtilityClasses('MuiDigitalClock', ['root', 'list', 'item']);