"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuUtilityClass = getMenuUtilityClass;
exports.menuClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Menu';
function getMenuUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const menuClasses = exports.menuClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'listbox', 'expanded']);