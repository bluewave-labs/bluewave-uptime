import * as React from 'react';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
import type { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import type { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
export declare const columnResizeStateInitializer: GridStateInitializer;
/**
 * @requires useGridColumns (method, event)
 * TODO: improve experience for last column
 */
export declare const useGridColumnResize: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'autosizeOptions' | 'autosizeOnMount' | 'disableAutosize' | 'onColumnResize' | 'onColumnWidthChange'>) => void;
