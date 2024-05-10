import _extends from "@babel/runtime/helpers/esm/extends";
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { pickersInputBaseClasses } from '../PickersInputBase';
export function getPickersOutlinedInputUtilityClass(slot) {
  return generateUtilityClass('MuiPickersOutlinedInput', slot);
}
export const pickersOutlinedInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses('MuiPickersOutlinedInput', ['root', 'notchedOutline', 'input']));