"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNavigationKey = exports.isMultipleKey = exports.isKeyboardEvent = exports.isHideMenuKey = exports.isEscapeKey = exports.isCellExitEditModeKeys = exports.isCellEnterEditModeKeys = exports.isCellEditCommitKeys = exports.GRID_MULTIPLE_SELECTION_KEYS = exports.GRID_CELL_EXIT_EDIT_MODE_KEYS = exports.GRID_CELL_EDIT_COMMIT_KEYS = void 0;
exports.isPasteShortcut = isPasteShortcut;
exports.isPrintableKey = isPrintableKey;
exports.isTabKey = void 0;
/**
 * @deprecated there is no meaninfuly logic abstracted, use event.key directly.
 */
const isEscapeKey = key => key === 'Escape';

/**
 * @deprecated there is no meaninfuly logic abstracted, use event.key directly.
 */
exports.isEscapeKey = isEscapeKey;
const isTabKey = key => key === 'Tab';

// Non printable keys have a name, for example "ArrowRight", see the whole list:
// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
// So event.key.length === 1 is often enough.
//
// However, we also need to ignore shortcuts, for example: select all:
// - Windows: Ctrl+A, event.ctrlKey is true
// - macOS: ⌘ Command+A, event.metaKey is true
exports.isTabKey = isTabKey;
function isPrintableKey(event) {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
const GRID_MULTIPLE_SELECTION_KEYS = exports.GRID_MULTIPLE_SELECTION_KEYS = ['Meta', 'Control', 'Shift'];
const GRID_CELL_EXIT_EDIT_MODE_KEYS = exports.GRID_CELL_EXIT_EDIT_MODE_KEYS = ['Enter', 'Escape', 'Tab'];
const GRID_CELL_EDIT_COMMIT_KEYS = exports.GRID_CELL_EDIT_COMMIT_KEYS = ['Enter', 'Tab'];
const isMultipleKey = key => GRID_MULTIPLE_SELECTION_KEYS.indexOf(key) > -1;
exports.isMultipleKey = isMultipleKey;
const isCellEnterEditModeKeys = event => isPrintableKey(event) || event.key === 'Enter' || event.key === 'Backspace' || event.key === 'Delete';
exports.isCellEnterEditModeKeys = isCellEnterEditModeKeys;
const isCellExitEditModeKeys = key => GRID_CELL_EXIT_EDIT_MODE_KEYS.indexOf(key) > -1;
exports.isCellExitEditModeKeys = isCellExitEditModeKeys;
const isCellEditCommitKeys = key => GRID_CELL_EDIT_COMMIT_KEYS.indexOf(key) > -1;
exports.isCellEditCommitKeys = isCellEditCommitKeys;
const isNavigationKey = key => key.indexOf('Arrow') === 0 || key.indexOf('Page') === 0 || key === ' ' || key === 'Home' || key === 'End';
exports.isNavigationKey = isNavigationKey;
const isKeyboardEvent = event => !!event.key;
exports.isKeyboardEvent = isKeyboardEvent;
const isHideMenuKey = key => isTabKey(key) || isEscapeKey(key);

// In theory, on macOS, ctrl + v doesn't trigger a paste, so the function should return false.
// However, maybe it's overkill to fix, so let's be lazy.
exports.isHideMenuKey = isHideMenuKey;
function isPasteShortcut(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v' && !event.shiftKey && !event.altKey) {
    return true;
  }
  return false;
}