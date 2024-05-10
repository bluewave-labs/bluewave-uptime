import * as React from 'react';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const rowsStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'rows' | 'rowCount' | 'getRowId' | 'loading'>>;
export declare const useGridRows: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'rows' | 'getRowId' | 'rowCount' | 'throttleRowsMs' | 'signature' | 'pagination' | 'paginationMode' | 'loading'>) => void;
