"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSliderUtilityClass = getSliderUtilityClass;
exports.sliderClasses = void 0;
var _generateUtilityClasses = require("../generateUtilityClasses");
var _generateUtilityClass = require("../generateUtilityClass");
const COMPONENT_NAME = 'Slider';
function getSliderUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const sliderClasses = exports.sliderClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'active', 'focusVisible', 'disabled', 'dragging', 'marked', 'vertical', 'trackInverted', 'trackFalse', 'rail', 'track', 'mark', 'markActive', 'markLabel', 'markLabelActive', 'thumb']);