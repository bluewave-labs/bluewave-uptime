import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getNativeSelectUtilityClasses(slot) {
  return generateUtilityClass('MuiNativeSelect', slot);
}
const nativeSelectClasses = generateUtilityClasses('MuiNativeSelect', ['root', 'select', 'multiple', 'filled', 'outlined', 'standard', 'disabled', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'iconStandard', 'nativeInput', 'error']);
export default nativeSelectClasses;