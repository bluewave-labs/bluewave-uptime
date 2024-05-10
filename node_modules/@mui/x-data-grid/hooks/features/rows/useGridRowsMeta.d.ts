import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const rowsMetaStateInitializer: GridStateInitializer;
/**
 * @requires useGridPageSize (method)
 * @requires useGridPage (method)
 */
export declare const useGridRowsMeta: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'getRowHeight' | 'getEstimatedRowHeight' | 'getRowSpacing' | 'pagination' | 'paginationMode' | 'rowHeight' | 'rowPositionsDebounceMs'>) => void;
