"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSwitchUtilityClass = getSwitchUtilityClass;
exports.switchClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Switch';
function getSwitchUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const switchClasses = exports.switchClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'input', 'track', 'thumb', 'checked', 'disabled', 'focusVisible', 'readOnly']);