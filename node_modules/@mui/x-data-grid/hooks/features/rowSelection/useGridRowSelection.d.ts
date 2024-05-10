import * as React from 'react';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const rowSelectionStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'rowSelectionModel' | 'rowSelection'>>;
/**
 * @requires useGridRows (state, method) - can be after
 * @requires useGridParamsApi (method) - can be after
 * @requires useGridFocus (state) - can be after
 * @requires useGridKeyboardNavigation (`cellKeyDown` event must first be consumed by it)
 */
export declare const useGridRowSelection: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'checkboxSelection' | 'rowSelectionModel' | 'onRowSelectionModelChange' | 'disableMultipleRowSelection' | 'disableRowSelectionOnClick' | 'isRowSelectable' | 'checkboxSelectionVisibleOnly' | 'pagination' | 'paginationMode' | 'classes' | 'keepNonExistentRowsSelected' | 'rowSelection' | 'signature'>) => void;
