"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_DESKTOP_MODE_MEDIA_QUERY = void 0;
exports.arrayIncludes = arrayIncludes;
exports.onSpaceOrEnter = exports.getActiveElement = exports.executeInTheNextEventLoopTick = void 0;
/* Use it instead of .includes method for IE support */
function arrayIncludes(array, itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.every(item => array.indexOf(item) !== -1);
  }
  return array.indexOf(itemOrItems) !== -1;
}
const onSpaceOrEnter = (innerFn, externalEvent) => event => {
  if (event.key === 'Enter' || event.key === ' ') {
    innerFn(event);

    // prevent any side effects
    event.preventDefault();
    event.stopPropagation();
  }
  if (externalEvent) {
    externalEvent(event);
  }
};
exports.onSpaceOrEnter = onSpaceOrEnter;
const executeInTheNextEventLoopTick = fn => {
  setTimeout(fn, 0);
};

// https://www.abeautifulsite.net/posts/finding-the-active-element-in-a-shadow-root/
exports.executeInTheNextEventLoopTick = executeInTheNextEventLoopTick;
const getActiveElement = (root = document) => {
  const activeEl = root.activeElement;
  if (!activeEl) {
    return null;
  }
  if (activeEl.shadowRoot) {
    return getActiveElement(activeEl.shadowRoot);
  }
  return activeEl;
};
exports.getActiveElement = getActiveElement;
const DEFAULT_DESKTOP_MODE_MEDIA_QUERY = exports.DEFAULT_DESKTOP_MODE_MEDIA_QUERY = '@media (pointer: fine)';