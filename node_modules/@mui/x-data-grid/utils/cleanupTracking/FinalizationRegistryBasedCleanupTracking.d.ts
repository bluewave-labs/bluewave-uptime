import { CleanupTracking, UnsubscribeFn, UnregisterToken } from './CleanupTracking';
export declare class FinalizationRegistryBasedCleanupTracking implements CleanupTracking {
    registry: FinalizationRegistry<UnsubscribeFn>;
    register(object: any, unsubscribe: UnsubscribeFn, unregisterToken: UnregisterToken): void;
    unregister(unregisterToken: UnregisterToken): void;
    reset(): void;
}
