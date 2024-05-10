import * as React from 'react';
import { ListContextValue } from '../useList/ListContext';
import { MenuItemMetadata } from '../useMenuItem';
import { CompoundComponentContextValue } from '../useCompound';
export type MenuProviderValue = CompoundComponentContextValue<string, MenuItemMetadata> & ListContextValue<string>;
export interface MenuProviderProps {
    value: MenuProviderValue;
    children: React.ReactNode;
}
/**
 * Sets up the contexts for the underlying MenuItem components.
 *
 * @ignore - do not document.
 */
export declare function MenuProvider(props: MenuProviderProps): React.JSX.Element;
