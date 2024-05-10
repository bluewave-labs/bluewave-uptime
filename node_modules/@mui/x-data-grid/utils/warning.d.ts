export declare const buildWarning: (message: string | string[], gravity?: 'warning' | 'error') => () => void;
export declare const wrapWithWarningOnCall: <F extends Function>(method: F, message: string | string[]) => F | ((...args: any[]) => any);
