"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonClasses = void 0;
exports.getButtonUtilityClass = getButtonUtilityClass;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Button';
function getButtonUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const buttonClasses = exports.buttonClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'active', 'disabled', 'focusVisible']);