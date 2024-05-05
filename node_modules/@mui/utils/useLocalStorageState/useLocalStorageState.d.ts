import * as React from 'react';
type Initializer = () => string | null;
type UseStorageStateHookResult = [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
];
/**
 * Sync state to local storage so that it persists through a page refresh. Usage is
 * similar to useState except we pass in a storage key so that we can default
 * to that value on page load instead of the specified initial value.
 *
 * Since the storage API isn't available in server-rendering environments, we
 * return null during SSR and hydration.
 */
declare function useLocalStorageStateBrowser(key: string | null, initializer?: string | null | Initializer): UseStorageStateHookResult;
declare const _default: typeof useLocalStorageStateBrowser;
export default _default;
