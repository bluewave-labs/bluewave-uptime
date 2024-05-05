import * as React from 'react';
import { ListContextValue } from '../useList/ListContext';
import { SelectOption } from '../useOption';
import { CompoundComponentContextValue } from '../useCompound';
export type SelectProviderValue<Value> = CompoundComponentContextValue<Value, SelectOption<Value>> & ListContextValue<Value>;
export interface SelectProviderProps<Value> {
    value: SelectProviderValue<Value>;
    children: React.ReactNode;
}
/**
 * Sets up the contexts for the underlying Option components.
 *
 * @ignore - do not document.
 */
export declare function SelectProvider<Value>(props: SelectProviderProps<Value>): React.JSX.Element;
