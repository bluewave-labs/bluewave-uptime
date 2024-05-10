import * as React from 'react';
interface RegisterItemReturnValue<Key> {
    /**
     * The id of the item.
     */
    id: Key;
    /**
     * A function that deregisters the item.
     */
    deregister: () => void;
}
export type KeyGenerator<Key> = (existingKeys: Set<Key>) => Key;
export type CompoundComponentContextValue<Key, Subitem> = {
    /**
     * Registers an item with the parent.
     * This should be called during the effect phase of the child component.
     * The `itemMetadata` should be a stable reference (for example a memoized object), to avoid unnecessary re-registrations.
     *
     * @param id Id of the item or A function that generates a unique id for the item.
     *   It is called with the set of the ids of all the items that have already been registered.
     *   Return `existingKeys.size` if you want to use the index of the new item as the id..
     * @param itemMetadata Arbitrary metadata to pass to the parent component.
     */
    registerItem: (id: Key | KeyGenerator<Key>, item: Subitem) => RegisterItemReturnValue<Key>;
    /**
     * Returns the 0-based index of the item in the parent component's list of registered items.
     *
     * @param id id of the item.
     */
    getItemIndex: (id: Key) => number;
    /**
     * The total number of items registered with the parent.
     */
    totalSubitemCount: number;
};
export declare const CompoundComponentContext: React.Context<CompoundComponentContextValue<any, any> | null>;
export interface UseCompoundParentReturnValue<Key, Subitem extends {
    ref: React.RefObject<Node>;
}> {
    /**
     * The value for the CompoundComponentContext provider.
     */
    contextValue: CompoundComponentContextValue<Key, Subitem>;
    /**
     * The subitems registered with the parent.
     * The key is the id of the subitem, and the value is the metadata passed to the `useCompoundItem` hook.
     * The order of the items is the same as the order in which they were registered.
     */
    subitems: Map<Key, Subitem>;
}
/**
 * Provides a way for a component to know about its children.
 *
 * Child components register themselves with the `useCompoundItem` hook, passing in arbitrary metadata to the parent.
 *
 * This is a more powerful altervantive to `children` traversal, as child components don't have to be placed
 * directly inside the parent component. They can be anywhere in the tree (and even rendered by other components).
 *
 * The downside is that this doesn't work with SSR as it relies on the useEffect hook.
 *
 * @ignore - internal hook.
 */
export declare function useCompoundParent<Key, Subitem extends {
    ref: React.RefObject<Node>;
}>(): UseCompoundParentReturnValue<Key, Subitem>;
export {};
