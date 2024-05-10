"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabPanelUtilityClass = getTabPanelUtilityClass;
exports.tabPanelClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'TabPanel';
function getTabPanelUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const tabPanelClasses = exports.tabPanelClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'hidden']);