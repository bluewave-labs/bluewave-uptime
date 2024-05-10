"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuItemUtilityClass = getMenuItemUtilityClass;
exports.menuItemClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'MenuItem';
function getMenuItemUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const menuItemClasses = exports.menuItemClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'disabled', 'focusVisible']);