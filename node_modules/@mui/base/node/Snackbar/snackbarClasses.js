"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnackbarUtilityClass = getSnackbarUtilityClass;
exports.snackbarClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'Snackbar';
function getSnackbarUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const snackbarClasses = exports.snackbarClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root']);