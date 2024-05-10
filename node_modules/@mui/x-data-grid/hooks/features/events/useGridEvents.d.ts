import * as React from 'react';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
/**
 * @requires useGridFocus (event) - can be after, async only
 * @requires useGridColumns (event) - can be after, async only
 */
export declare function useGridEvents(apiRef: React.MutableRefObject<GridApiCommunity>, props: Pick<DataGridProcessedProps, 'onColumnHeaderClick' | 'onColumnHeaderDoubleClick' | 'onColumnHeaderOver' | 'onColumnHeaderOut' | 'onColumnHeaderEnter' | 'onColumnHeaderLeave' | 'onCellClick' | 'onCellDoubleClick' | 'onCellKeyDown' | 'onPreferencePanelClose' | 'onPreferencePanelOpen' | 'onRowDoubleClick' | 'onRowClick' | 'onStateChange' | 'onMenuOpen' | 'onMenuClose'>): void;
