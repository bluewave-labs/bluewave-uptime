"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuButtonUtilityClass = getMenuButtonUtilityClass;
exports.menuButtonClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'MenuButton';
function getMenuButtonUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const menuButtonClasses = exports.menuButtonClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'active', 'disabled', 'expanded']);