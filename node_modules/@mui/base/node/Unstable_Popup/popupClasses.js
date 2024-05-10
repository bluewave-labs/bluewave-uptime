"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPopupUtilityClass = getPopupUtilityClass;
exports.popupClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Popup';
function getPopupUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const popupClasses = exports.popupClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'open']);