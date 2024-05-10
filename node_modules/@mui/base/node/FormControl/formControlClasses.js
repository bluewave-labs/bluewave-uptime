"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formControlClasses = void 0;
exports.getFormControlUtilityClass = getFormControlUtilityClass;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'FormControl';
function getFormControlUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const formControlClasses = exports.formControlClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'disabled', 'error', 'filled', 'focused', 'required']);