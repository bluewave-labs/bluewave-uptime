"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.badgeClasses = void 0;
exports.getBadgeUtilityClass = getBadgeUtilityClass;
var _generateUtilityClasses = require("../generateUtilityClasses");
var _generateUtilityClass = require("../generateUtilityClass");
const COMPONENT_NAME = 'Badge';
function getBadgeUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const badgeClasses = exports.badgeClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'badge', 'invisible']);