import * as React from 'react';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const filterStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'filterModel' | 'initialState' | 'disableMultipleColumnsFiltering'>>;
/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 * @requires useGridRows (event)
 */
export declare const useGridFilter: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'rows' | 'initialState' | 'filterModel' | 'getRowId' | 'onFilterModelChange' | 'filterMode' | 'disableMultipleColumnsFiltering' | 'slots' | 'slotProps' | 'disableColumnFilter' | 'disableEval' | 'ignoreDiacritics'>) => void;
