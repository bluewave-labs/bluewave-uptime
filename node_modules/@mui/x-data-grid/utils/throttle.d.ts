export interface Cancelable {
    clear(): void;
}
export declare function throttle<T extends (...args: any[]) => any>(func: T, wait?: number): T & Cancelable;
