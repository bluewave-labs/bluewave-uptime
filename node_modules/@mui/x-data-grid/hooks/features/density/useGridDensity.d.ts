import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const densityStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'initialState' | 'density'>>;
export declare const useGridDensity: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'density' | 'onDensityChange' | 'initialState'>) => void;
