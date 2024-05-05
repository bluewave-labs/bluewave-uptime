'use client';

import * as React from 'react';

// storage events only work across tabs, we'll use an event emitter to announce within the current tab
var currentTabChangeListeners = new Map();
function onCurrentTabStorageChange(key, handler) {
  var listeners = currentTabChangeListeners.get(key);
  if (!listeners) {
    listeners = new Set();
    currentTabChangeListeners.set(key, listeners);
  }
  listeners.add(handler);
}
function offCurrentTabStorageChange(key, handler) {
  var listeners = currentTabChangeListeners.get(key);
  if (!listeners) {
    return;
  }
  listeners.delete(handler);
  if (listeners.size === 0) {
    currentTabChangeListeners.delete(key);
  }
}
function emitCurrentTabStorageChange(key) {
  var listeners = currentTabChangeListeners.get(key);
  if (listeners) {
    listeners.forEach(function (listener) {
      return listener();
    });
  }
}
function subscribe(area, key, callbark) {
  if (!key) {
    return function () {};
  }
  var storageHandler = function storageHandler(event) {
    if (event.storageArea === area && event.key === key) {
      callbark();
    }
  };
  window.addEventListener('storage', storageHandler);
  onCurrentTabStorageChange(key, callbark);
  return function () {
    window.removeEventListener('storage', storageHandler);
    offCurrentTabStorageChange(key, callbark);
  };
}
function getSnapshot(area, key) {
  if (!key) {
    return null;
  }
  try {
    return area.getItem(key);
  } catch (_unused) {
    // ignore
    // See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
    return null;
  }
}
function setValue(area, key, value) {
  if (!key) {
    return;
  }
  try {
    if (value === null) {
      area.removeItem(key);
    } else {
      area.setItem(key, String(value));
    }
  } catch (_unused2) {
    // ignore
    // See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
    return;
  }
  emitCurrentTabStorageChange(key);
}
var serverValue = [null, function () {}];
function useLocalStorageStateServer() {
  return serverValue;
}

/**
 * Sync state to local storage so that it persists through a page refresh. Usage is
 * similar to useState except we pass in a storage key so that we can default
 * to that value on page load instead of the specified initial value.
 *
 * Since the storage API isn't available in server-rendering environments, we
 * return null during SSR and hydration.
 */
function useLocalStorageStateBrowser(key) {
  var initializer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var _React$useState = React.useState(initializer),
    initialValue = _React$useState[0];
  var area = window.localStorage;
  var subscribeKey = React.useCallback(function (callbark) {
    return subscribe(area, key, callbark);
  }, [area, key]);
  var getKeySnapshot = React.useCallback(function () {
    var _getSnapshot;
    return (_getSnapshot = getSnapshot(area, key)) != null ? _getSnapshot : initialValue;
  }, [area, initialValue, key]);

  // Start with null for the hydration, and then switch to the actual value.
  var getKeyServerSnapshot = function getKeyServerSnapshot() {
    return null;
  };
  var storedValue = React.useSyncExternalStore(subscribeKey, getKeySnapshot, getKeyServerSnapshot);
  var setStoredValue = React.useCallback(function (value) {
    var valueToStore = value instanceof Function ? value(storedValue) : value;
    setValue(area, key, valueToStore);
  }, [area, key, storedValue]);
  var _React$useState2 = React.useState(initialValue),
    nonStoredValue = _React$useState2[0],
    setNonStoredValue = _React$useState2[1];
  if (!key) {
    return [nonStoredValue, setNonStoredValue];
  }
  return [storedValue, setStoredValue];
}
export default typeof window === 'undefined' ? useLocalStorageStateServer : useLocalStorageStateBrowser;