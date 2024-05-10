type Listener<T> = (value: T) => void;
export declare class Store<T> {
    value: T;
    listeners: Set<Listener<T>>;
    static create<T>(value: T): Store<T>;
    constructor(value: T);
    subscribe: (fn: Listener<T>) => () => void;
    getSnapshot: () => T;
    update: (value: T) => void;
}
export {};
