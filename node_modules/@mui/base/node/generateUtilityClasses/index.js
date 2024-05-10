"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUtilityClasses = generateUtilityClasses;
var _generateUtilityClass = require("../generateUtilityClass");
function generateUtilityClasses(componentName, slots) {
  const result = {};
  slots.forEach(slot => {
    result[slot] = (0, _generateUtilityClass.generateUtilityClass)(componentName, slot);
  });
  return result;
}