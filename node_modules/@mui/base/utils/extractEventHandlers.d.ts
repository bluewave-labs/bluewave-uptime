import { EventHandlers } from './types';
/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 * @param excludeKeys An array of keys to exclude from the returned object.
 */
export declare function extractEventHandlers(object: Record<string, any> | undefined, excludeKeys?: string[]): EventHandlers;
