import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
export function getSpeedDialActionUtilityClass(slot) {
  return generateUtilityClass('MuiSpeedDialAction', slot);
}
var speedDialActionClasses = generateUtilityClasses('MuiSpeedDialAction', ['fab', 'fabClosed', 'staticTooltip', 'staticTooltipClosed', 'staticTooltipLabel', 'tooltipPlacementLeft', 'tooltipPlacementRight']);
export default speedDialActionClasses;