import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getScopedCssBaselineUtilityClass(slot) {
  return generateUtilityClass('MuiScopedCssBaseline', slot);
}
const scopedCssBaselineClasses = generateUtilityClasses('MuiScopedCssBaseline', ['root']);
export default scopedCssBaselineClasses;