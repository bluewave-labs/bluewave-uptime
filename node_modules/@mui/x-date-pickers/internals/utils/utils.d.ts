import * as React from 'react';
export declare function arrayIncludes<T>(array: T[] | readonly T[], itemOrItems: T | T[]): boolean;
export declare const onSpaceOrEnter: (innerFn: (ev: React.MouseEvent<any> | React.KeyboardEvent<any>) => void, externalEvent?: (event: React.KeyboardEvent<any>) => void) => (event: React.KeyboardEvent) => void;
export declare const executeInTheNextEventLoopTick: (fn: () => void) => void;
export declare const getActiveElement: (root?: Document | ShadowRoot) => Element | null;
export declare const DEFAULT_DESKTOP_MODE_MEDIA_QUERY = "@media (pointer: fine)";
