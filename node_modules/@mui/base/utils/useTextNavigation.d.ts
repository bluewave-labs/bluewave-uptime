import * as React from 'react';
/**
 * @ignore - internal hook.
 *
 * Provides a handler for text navigation.
 * It's used to navigate a list by typing the first letters of the options.
 *
 * @param callback A function to be called when the navigation should be performed.
 * @returns A function to be used in a keydown event handler.
 */
export declare function useTextNavigation(callback: (searchString: string, event: React.KeyboardEvent) => void): (event: React.KeyboardEvent) => void;
