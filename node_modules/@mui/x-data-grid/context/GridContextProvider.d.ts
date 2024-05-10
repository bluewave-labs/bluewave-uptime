import * as React from 'react';
import { GridPrivateApiCommunity } from '../models/api/gridApiCommunity';
type GridContextProviderProps = {
    privateApiRef: React.MutableRefObject<GridPrivateApiCommunity>;
    props: {};
    children: React.ReactNode;
};
export declare function GridContextProvider({ privateApiRef, props, children }: GridContextProviderProps): React.JSX.Element;
export {};
