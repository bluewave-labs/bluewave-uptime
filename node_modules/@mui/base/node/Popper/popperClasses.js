"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPopperUtilityClass = getPopperUtilityClass;
exports.popperClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Popper';
function getPopperUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const popperClasses = exports.popperClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root']);