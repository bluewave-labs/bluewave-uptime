"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModalUtilityClass = getModalUtilityClass;
exports.modalClasses = void 0;
var _generateUtilityClasses = require("../generateUtilityClasses");
var _generateUtilityClass = require("../generateUtilityClass");
const COMPONENT_NAME = 'Modal';
function getModalUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const modalClasses = exports.modalClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'hidden', 'backdrop']);