import { generateUtilityClasses } from '../generateUtilityClasses';
import { generateUtilityClass } from '../generateUtilityClass';
const COMPONENT_NAME = 'Slider';
export function getSliderUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const sliderClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'active', 'focusVisible', 'disabled', 'dragging', 'marked', 'vertical', 'trackInverted', 'trackFalse', 'rail', 'track', 'mark', 'markActive', 'markLabel', 'markLabelActive', 'thumb']);