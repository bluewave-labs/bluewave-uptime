"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListActionTypes = void 0;
const ListActionTypes = exports.ListActionTypes = {
  blur: 'list:blur',
  focus: 'list:focus',
  itemClick: 'list:itemClick',
  itemHover: 'list:itemHover',
  itemsChange: 'list:itemsChange',
  keyDown: 'list:keyDown',
  resetHighlight: 'list:resetHighlight',
  highlightLast: 'list:highlightLast',
  textNavigation: 'list:textNavigation',
  clearSelection: 'list:clearSelection'
};

/**
 * A union of all standard actions that can be dispatched to the list reducer.
 */