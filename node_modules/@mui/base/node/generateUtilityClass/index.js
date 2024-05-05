"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUtilityClass = generateUtilityClass;
exports.isGlobalState = isGlobalState;
var _generateUtilityClass = require("@mui/utils/generateUtilityClass");
const GLOBAL_CLASS_PREFIX = 'base';
function buildStateClass(state) {
  return `${GLOBAL_CLASS_PREFIX}--${state}`;
}
function buildSlotClass(componentName, slot) {
  return `${GLOBAL_CLASS_PREFIX}-${componentName}-${slot}`;
}
function generateUtilityClass(componentName, slot) {
  const globalStateClass = _generateUtilityClass.globalStateClasses[slot];
  return globalStateClass ? buildStateClass(globalStateClass) : buildSlotClass(componentName, slot);
}
function isGlobalState(slot) {
  return _generateUtilityClass.globalStateClasses[slot] !== undefined;
}