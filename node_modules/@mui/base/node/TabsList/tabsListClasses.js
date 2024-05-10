"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabsListUtilityClass = getTabsListUtilityClass;
exports.tabsListClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'TabsList';
function getTabsListUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const tabsListClasses = exports.tabsListClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'horizontal', 'vertical']);