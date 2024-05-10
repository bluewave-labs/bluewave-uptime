export type UnregisterToken = {
    cleanupToken: number;
};
export type UnsubscribeFn = () => void;
export interface CleanupTracking {
    register(object: any, unsubscribe: UnsubscribeFn, unregisterToken: UnregisterToken): void;
    unregister(unregisterToken: UnregisterToken): void;
    reset(): void;
}
