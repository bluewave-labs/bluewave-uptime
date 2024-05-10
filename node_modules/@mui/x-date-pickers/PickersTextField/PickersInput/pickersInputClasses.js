import _extends from "@babel/runtime/helpers/esm/extends";
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { pickersInputBaseClasses } from '../PickersInputBase';
export function getPickersInputUtilityClass(slot) {
  return generateUtilityClass('MuiPickersFilledInput', slot);
}
export const pickersInputClasses = _extends({}, pickersInputBaseClasses, generateUtilityClasses('MuiPickersInput', ['root', 'input']));