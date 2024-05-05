'use client';

import * as React from 'react';
export function createMessageBus() {
  var listeners = new Map();
  function subscribe(topic, callback) {
    var topicListeners = listeners.get(topic);
    if (!topicListeners) {
      topicListeners = new Set([callback]);
      listeners.set(topic, topicListeners);
    } else {
      topicListeners.add(callback);
    }
    return function () {
      topicListeners.delete(callback);
      if (topicListeners.size === 0) {
        listeners.delete(topic);
      }
    };
  }
  function publish(topic) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var topicListeners = listeners.get(topic);
    if (topicListeners) {
      topicListeners.forEach(function (callback) {
        return callback.apply(void 0, args);
      });
    }
  }
  return {
    subscribe: subscribe,
    publish: publish
  };
}

/**
 * @ignore - internal hook.
 */
export function useMessageBus() {
  var bus = React.useRef();
  if (!bus.current) {
    bus.current = createMessageBus();
  }
  return bus.current;
}