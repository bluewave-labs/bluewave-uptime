"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTablePaginationUtilityClass = getTablePaginationUtilityClass;
exports.tablePaginationClasses = void 0;
var _generateUtilityClass = require("../generateUtilityClass");
var _generateUtilityClasses = require("../generateUtilityClasses");
const COMPONENT_NAME = 'TablePagination';
function getTablePaginationUtilityClass(slot) {
  return (0, _generateUtilityClass.generateUtilityClass)(COMPONENT_NAME, slot);
}
const tablePaginationClasses = exports.tablePaginationClasses = (0, _generateUtilityClasses.generateUtilityClasses)(COMPONENT_NAME, ['root', 'toolbar', 'spacer', 'selectLabel', 'selectRoot', 'select', 'selectIcon', 'input', 'menuItem', 'displayedRows', 'actions']);