"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptionGroupUtilityClass = getOptionGroupUtilityClass;
exports.optionGroupClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'OptionGroup';
function getOptionGroupUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const optionGroupClasses = exports.optionGroupClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'disabled', 'label', 'list']);