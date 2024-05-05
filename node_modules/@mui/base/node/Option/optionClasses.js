"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptionUtilityClass = getOptionUtilityClass;
exports.optionClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Option';
function getOptionUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const optionClasses = exports.optionClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'disabled', 'selected', 'highlighted']);