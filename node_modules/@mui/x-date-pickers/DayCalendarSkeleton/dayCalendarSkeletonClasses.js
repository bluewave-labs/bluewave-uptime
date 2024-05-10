import { unstable_generateUtilityClass as generateUtilityClass, unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';
export const getDayCalendarSkeletonUtilityClass = slot => generateUtilityClass('MuiDayCalendarSkeleton', slot);
export const dayCalendarSkeletonClasses = generateUtilityClasses('MuiDayCalendarSkeleton', ['root', 'week', 'daySkeleton']);