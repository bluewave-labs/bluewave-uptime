import * as React from 'react';
import { GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
export declare const useGridRowEditing: (apiRef: React.MutableRefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'editMode' | 'processRowUpdate' | 'onRowEditStart' | 'onRowEditStop' | 'onProcessRowUpdateError' | 'rowModesModel' | 'onRowModesModelChange' | 'signature'>) => void;
