import * as React from 'react';
/**
 * @deprecated there is no meaninfuly logic abstracted, use event.key directly.
 */
export declare const isEscapeKey: (key: string) => boolean;
/**
 * @deprecated there is no meaninfuly logic abstracted, use event.key directly.
 */
export declare const isTabKey: (key: string) => boolean;
export declare function isPrintableKey(event: React.KeyboardEvent<HTMLElement>): boolean;
export declare const GRID_MULTIPLE_SELECTION_KEYS: string[];
export declare const GRID_CELL_EXIT_EDIT_MODE_KEYS: string[];
export declare const GRID_CELL_EDIT_COMMIT_KEYS: string[];
export declare const isMultipleKey: (key: string) => boolean;
export declare const isCellEnterEditModeKeys: (event: React.KeyboardEvent<HTMLElement>) => boolean;
export declare const isCellExitEditModeKeys: (key: string) => boolean;
export declare const isCellEditCommitKeys: (key: string) => boolean;
export declare const isNavigationKey: (key: string) => boolean;
export declare const isKeyboardEvent: (event: any) => event is React.KeyboardEvent<HTMLElement>;
export declare const isHideMenuKey: (key: React.KeyboardEvent['key']) => boolean;
export declare function isPasteShortcut(event: React.KeyboardEvent): boolean;
