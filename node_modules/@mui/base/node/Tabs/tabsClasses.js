"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabsUtilityClass = getTabsUtilityClass;
exports.tabsClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Tabs';
function getTabsUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const tabsClasses = exports.tabsClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'horizontal', 'vertical']);