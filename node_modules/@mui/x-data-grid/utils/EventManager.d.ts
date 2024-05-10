export type EventListener = (...args: any[]) => void;
export interface EventListenerOptions {
    isFirst?: boolean;
}
interface EventListenerCollection {
    /**
     * List of listeners to run before the others
     * They are run in the opposite order of the registration order
     */
    highPriority: Map<EventListener, true>;
    /**
     * List of events to run after the high priority listeners
     * They are run in the registration order
     */
    regular: Map<EventListener, true>;
}
export declare class EventManager {
    maxListeners: number;
    warnOnce: boolean;
    events: {
        [eventName: string]: EventListenerCollection;
    };
    on(eventName: string, listener: EventListener, options?: EventListenerOptions): void;
    removeListener(eventName: string, listener: EventListener): void;
    removeAllListeners(): void;
    emit(eventName: string, ...args: any[]): void;
    once(eventName: string, listener: EventListener): void;
}
export {};
