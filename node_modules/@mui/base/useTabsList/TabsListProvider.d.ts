import * as React from 'react';
import { ListContextValue } from '../useList/ListContext';
import { TabMetadata } from '../useTabs';
import { CompoundComponentContextValue } from '../useCompound';
export type TabsListProviderValue = CompoundComponentContextValue<string | number, TabMetadata> & ListContextValue<string | number>;
export interface TabsListProviderProps {
    value: TabsListProviderValue;
    children: React.ReactNode;
}
/**
 * Sets up the contexts for the underlying Tab components.
 *
 * @ignore - do not document.
 */
export declare function TabsListProvider(props: TabsListProviderProps): React.JSX.Element;
