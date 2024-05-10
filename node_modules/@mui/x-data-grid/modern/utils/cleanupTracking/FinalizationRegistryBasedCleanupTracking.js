export class FinalizationRegistryBasedCleanupTracking {
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