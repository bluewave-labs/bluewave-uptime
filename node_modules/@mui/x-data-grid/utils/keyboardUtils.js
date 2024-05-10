/**
 * @deprecated there is no meaninfuly logic abstracted, use event.key directly.
 */
export const isEscapeKey = key => key === 'Escape';

/**
 * @deprecated there is no meaninfuly logic abstracted, use event.key directly.
 */
export const isTabKey = key => key === 'Tab';

// Non printable keys have a name, for example "ArrowRight", see the whole list:
// https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
// So event.key.length === 1 is often enough.
//
// However, we also need to ignore shortcuts, for example: select all:
// - Windows: Ctrl+A, event.ctrlKey is true
// - macOS: ⌘ Command+A, event.metaKey is true
export function isPrintableKey(event) {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey;
}
export const GRID_MULTIPLE_SELECTION_KEYS = ['Meta', 'Control', 'Shift'];
export const GRID_CELL_EXIT_EDIT_MODE_KEYS = ['Enter', 'Escape', 'Tab'];
export const GRID_CELL_EDIT_COMMIT_KEYS = ['Enter', 'Tab'];
export const isMultipleKey = key => GRID_MULTIPLE_SELECTION_KEYS.indexOf(key) > -1;
export const isCellEnterEditModeKeys = event => isPrintableKey(event) || event.key === 'Enter' || event.key === 'Backspace' || event.key === 'Delete';
export const isCellExitEditModeKeys = key => GRID_CELL_EXIT_EDIT_MODE_KEYS.indexOf(key) > -1;
export const isCellEditCommitKeys = key => GRID_CELL_EDIT_COMMIT_KEYS.indexOf(key) > -1;
export const isNavigationKey = key => key.indexOf('Arrow') === 0 || key.indexOf('Page') === 0 || key === ' ' || key === 'Home' || key === 'End';
export const isKeyboardEvent = event => !!event.key;
export const isHideMenuKey = key => isTabKey(key) || isEscapeKey(key);

// In theory, on macOS, ctrl + v doesn't trigger a paste, so the function should return false.
// However, maybe it's overkill to fix, so let's be lazy.
export function isPasteShortcut(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v' && !event.shiftKey && !event.altKey) {
    return true;
  }
  return false;
}