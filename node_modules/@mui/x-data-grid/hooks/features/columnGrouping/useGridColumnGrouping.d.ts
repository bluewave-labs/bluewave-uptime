import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const columnGroupsStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'columnGroupingModel' | 'experimentalFeatures'>>;
/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 */
export declare const useGridColumnGrouping: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'columnGroupingModel'>) => void;
