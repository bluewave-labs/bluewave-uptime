import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getSelectUtilityClasses(slot) {
  return generateUtilityClass('MuiSelect', slot);
}
var selectClasses = generateUtilityClasses('MuiSelect', ['root', 'select', 'multiple', 'filled', 'outlined', 'standard', 'disabled', 'focused', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'iconStandard', 'nativeInput', 'error']);
export default selectClasses;