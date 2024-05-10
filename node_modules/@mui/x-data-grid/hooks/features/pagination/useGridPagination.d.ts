import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const paginationStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'paginationModel' | 'rowCount' | 'initialState' | 'autoPageSize' | 'signature' | 'paginationMeta'>>;
/**
 * @requires useGridFilter (state)
 * @requires useGridDimensions (event) - can be after
 */
export declare const useGridPagination: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: DataGridProcessedProps) => void;
