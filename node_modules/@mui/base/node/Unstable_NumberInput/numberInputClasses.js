"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNumberInputUtilityClass = getNumberInputUtilityClass;
exports.numberInputClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'NumberInput';
function getNumberInputUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const numberInputClasses = exports.numberInputClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'formControl', 'focused', 'disabled', 'readOnly', 'error', 'input', 'incrementButton', 'decrementButton', 'adornedStart', 'adornedEnd']);