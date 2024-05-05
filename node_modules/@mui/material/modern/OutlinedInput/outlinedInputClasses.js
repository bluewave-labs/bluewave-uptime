import _extends from "@babel/runtime/helpers/esm/extends";
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { inputBaseClasses } from '../InputBase';
export function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass('MuiOutlinedInput', slot);
}
const outlinedInputClasses = _extends({}, inputBaseClasses, generateUtilityClasses('MuiOutlinedInput', ['root', 'notchedOutline', 'input']));
export default outlinedInputClasses;