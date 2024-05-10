import _extends from "@babel/runtime/helpers/esm/extends";
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { pickersInputBaseClasses } from '../PickersInputBase';
export function getPickersFilledInputUtilityClass(slot) {
  return generateUtilityClass('MuiPickersFilledInput', slot);
}
export const pickersFilledInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses('MuiPickersFilledInput', ['root', 'underline', 'input']));