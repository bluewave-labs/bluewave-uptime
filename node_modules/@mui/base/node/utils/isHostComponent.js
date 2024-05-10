"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHostComponent = isHostComponent;
/**
 * Determines if a given element is a DOM element name (i.e. not a React component).
 */
function isHostComponent(element) {
  return typeof element === 'string';
}