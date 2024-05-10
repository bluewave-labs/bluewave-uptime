import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
export declare const useGridCellEditing: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'editMode' | 'processRowUpdate' | 'onCellEditStart' | 'onCellEditStop' | 'cellModesModel' | 'onCellModesModelChange' | 'onProcessRowUpdateError' | 'signature'>) => void;
