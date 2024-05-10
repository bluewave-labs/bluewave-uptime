"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinalizationRegistryBasedCleanupTracking = void 0;
class FinalizationRegistryBasedCleanupTracking {
  constructor() {
    this.registry = new FinalizationRegistry(unsubscribe => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
  }
  register(object, unsubscribe, unregisterToken) {
    this.registry.register(object, unsubscribe, unregisterToken);
  }
  unregister(unregisterToken) {
    this.registry.unregister(unregisterToken);
  }

  // eslint-disable-next-line class-methods-use-this
  reset() {}
}
exports.FinalizationRegistryBasedCleanupTracking = FinalizationRegistryBasedCleanupTracking;