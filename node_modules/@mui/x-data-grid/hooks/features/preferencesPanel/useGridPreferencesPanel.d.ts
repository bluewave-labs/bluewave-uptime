import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridStateInitializer } from '../../utils/useGridInitializeState';
export declare const preferencePanelStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'initialState'>>;
/**
 * TODO: Add a single `setPreferencePanel` method to avoid multiple `setState`
 */
export declare const useGridPreferencesPanel: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'initialState'>) => void;
