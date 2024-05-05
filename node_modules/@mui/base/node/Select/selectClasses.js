"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelectUtilityClass = getSelectUtilityClass;
exports.selectClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Select';
function getSelectUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const selectClasses = exports.selectClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'button', 'listbox', 'popup', 'active', 'expanded', 'disabled', 'focusVisible']);