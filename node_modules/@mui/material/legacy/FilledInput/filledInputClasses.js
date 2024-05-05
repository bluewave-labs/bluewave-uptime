import _extends from "@babel/runtime/helpers/esm/extends";
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { inputBaseClasses } from '../InputBase';
export function getFilledInputUtilityClass(slot) {
  return generateUtilityClass('MuiFilledInput', slot);
}
var filledInputClasses = _extends({}, inputBaseClasses, generateUtilityClasses('MuiFilledInput', ['root', 'underline', 'input']));
export default filledInputClasses;