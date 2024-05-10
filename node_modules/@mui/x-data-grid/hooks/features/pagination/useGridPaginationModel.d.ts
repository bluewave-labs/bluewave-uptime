import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridPaginationState } from './gridPaginationInterfaces';
import { GridPaginationModel } from '../../../models/gridPaginationProps';
export declare const getDerivedPaginationModel: (paginationState: GridPaginationState, signature: DataGridProcessedProps['signature'], paginationModelProp?: GridPaginationModel) => GridPaginationModel;
/**
 * @requires useGridFilter (state)
 * @requires useGridDimensions (event) - can be after
 */
export declare const useGridPaginationModel: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'paginationModel' | 'onPaginationModelChange' | 'autoPageSize' | 'initialState' | 'paginationMode' | 'signature' | 'rowHeight'>) => void;
