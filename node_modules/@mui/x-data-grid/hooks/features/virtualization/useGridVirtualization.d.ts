import * as React from 'react';
import { GridRenderContext } from '../../../models';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
type RootProps = Pick<DataGridProcessedProps, 'disableVirtualization'>;
export type GridVirtualizationState = {
    enabled: boolean;
    enabledForColumns: boolean;
    renderContext: GridRenderContext;
};
export declare const EMPTY_RENDER_CONTEXT: {
    firstRowIndex: number;
    lastRowIndex: number;
    firstColumnIndex: number;
    lastColumnIndex: number;
};
export declare const virtualizationStateInitializer: GridStateInitializer<RootProps>;
export declare function useGridVirtualization(apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: RootProps): void;
export {};
