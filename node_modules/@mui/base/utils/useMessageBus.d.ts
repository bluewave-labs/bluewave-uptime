export interface MessageBus {
    subscribe(topic: string, callback: Function): () => void;
    publish(topic: string, ...args: unknown[]): void;
}
export declare function createMessageBus(): MessageBus;
/**
 * @ignore - internal hook.
 */
export declare function useMessageBus(): MessageBus;
