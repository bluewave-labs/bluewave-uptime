export type ControllablePromise<T = unknown> = Promise<T> & {
    resolve: T extends unknown ? (value?: T) => void : (value: T) => void;
    reject: (reason?: any) => void;
};
export declare function createControllablePromise(): ControllablePromise<unknown>;
