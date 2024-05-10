import * as React from 'react';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
import type { GridApiCommon, GridPrivateApiCommon } from '../../models/api/gridApiCommon';
export declare function unwrapPrivateAPI<PrivateApi extends GridPrivateApiCommon, Api extends GridApiCommon>(publicApi: Api): PrivateApi;
export declare function useGridApiInitialization<PrivateApi extends GridPrivateApiCommon, Api extends GridApiCommon>(inputApiRef: React.MutableRefObject<Api> | undefined, props: Pick<DataGridProcessedProps, 'signature'>): React.MutableRefObject<PrivateApi>;
