export declare class Timeout {
    static create(): Timeout;
    currentId: ReturnType<typeof setTimeout> | null;
    /**
     * Executes `fn` after `delay`, clearing any previously scheduled call.
     */
    start(delay: number, fn: Function): void;
    clear: () => void;
    disposeEffect: () => () => void;
}
export default function useTimeout(): Timeout;
