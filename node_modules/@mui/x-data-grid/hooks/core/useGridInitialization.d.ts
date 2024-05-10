import * as React from 'react';
import type { GridApiCommon, GridPrivateApiCommon } from '../../models/api/gridApiCommon';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
/**
 * Initialize the technical pieces of the DataGrid (logger, state, ...) that any DataGrid implementation needs
 */
export declare const useGridInitialization: <PrivateApi extends GridPrivateApiCommon, Api extends GridApiCommon<any, any>>(inputApiRef: React.MutableRefObject<Api> | undefined, props: DataGridProcessedProps) => React.MutableRefObject<PrivateApi>;
