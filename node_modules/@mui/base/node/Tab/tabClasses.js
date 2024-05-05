"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabUtilityClass = getTabUtilityClass;
exports.tabClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Tab';
function getTabUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const tabClasses = exports.tabClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'selected', 'disabled']);