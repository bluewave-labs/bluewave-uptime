import * as React from 'react';
import { TabsContextValue } from '../Tabs/TabsContext';
import { CompoundComponentContextValue } from '../useCompound';
export type TabPanelMetadata = {
    id: string | undefined;
    ref: React.RefObject<HTMLElement>;
};
export type TabsProviderValue = CompoundComponentContextValue<string | number, TabPanelMetadata> & TabsContextValue;
export interface TabsProviderProps {
    value: TabsProviderValue;
    children: React.ReactNode;
}
/**
 * Sets up the contexts for the underlying Tab and TabPanel components.
 *
 * @ignore - do not document.
 */
export declare function TabsProvider(props: TabsProviderProps): React.JSX.Element;
