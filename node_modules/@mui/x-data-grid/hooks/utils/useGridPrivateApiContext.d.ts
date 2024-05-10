import * as React from 'react';
import { GridPrivateApiCommon } from '../../models/api/gridApiCommon';
import { GridPrivateApiCommunity } from '../../models/api/gridApiCommunity';
export declare const GridPrivateApiContext: React.Context<unknown>;
export declare function useGridPrivateApiContext<PrivateApi extends GridPrivateApiCommon = GridPrivateApiCommunity>(): React.MutableRefObject<PrivateApi>;
