import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getSkeletonUtilityClass(slot) {
  return generateUtilityClass('MuiSkeleton', slot);
}
var skeletonClasses = generateUtilityClasses('MuiSkeleton', ['root', 'text', 'rectangular', 'rounded', 'circular', 'pulse', 'wave', 'withChildren', 'fitContent', 'heightAuto']);
export default skeletonClasses;