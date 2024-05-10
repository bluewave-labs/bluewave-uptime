import type { GridInitialStateCommunity, GridStateCommunity } from '../gridStateCommunity';
import type { DataGridProcessedProps } from '../props/DataGridProps';
import type { GridApiCommon, GridPrivateOnlyApiCommon } from './gridApiCommon';
import type { GridColumnReorderApi } from './gridColumnApi';
import { GridRowProApi } from './gridRowApi';
import { GridRowMultiSelectionApi } from './gridRowSelectionApi';
/**
 * The api of `DataGrid`.
 */
export interface GridApiCommunity extends GridApiCommon<GridStateCommunity, GridInitialStateCommunity> {
}
export interface GridPrivateApiCommunity extends GridApiCommunity, GridPrivateOnlyApiCommon<GridApiCommunity, GridPrivateApiCommunity, DataGridProcessedProps>, GridRowMultiSelectionApi, GridColumnReorderApi, GridRowProApi {
}
