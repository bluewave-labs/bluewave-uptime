import _extends from "@babel/runtime/helpers/esm/extends";
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { inputBaseClasses } from '../InputBase';
export function getInputUtilityClass(slot) {
  return generateUtilityClass('MuiInput', slot);
}
const inputClasses = _extends({}, inputBaseClasses, generateUtilityClasses('MuiInput', ['root', 'underline', 'input']));
export default inputClasses;