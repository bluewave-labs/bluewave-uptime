/// <reference types="node" />
import { CleanupTracking, UnregisterToken, UnsubscribeFn } from './CleanupTracking';
export declare class TimerBasedCleanupTracking implements CleanupTracking {
    timeouts?: Map<number, NodeJS.Timeout> | undefined;
    cleanupTimeout: number;
    constructor(timeout?: number);
    register(object: any, unsubscribe: UnsubscribeFn, unregisterToken: UnregisterToken): void;
    unregister(unregisterToken: UnregisterToken): void;
    reset(): void;
}
