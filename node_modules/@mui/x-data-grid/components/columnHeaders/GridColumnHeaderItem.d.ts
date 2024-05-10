import * as React from 'react';
import { GridStateColDef } from '../../models/colDef/gridColDef';
import { GridSortDirection } from '../../models/gridSortModel';
import { GridColumnHeaderSeparatorProps } from './GridColumnHeaderSeparator';
import { GridPinnedColumnPosition } from '../../hooks/features/columns/gridColumnsInterfaces';
interface GridColumnHeaderItemProps {
    colIndex: number;
    colDef: GridStateColDef;
    columnMenuOpen: boolean;
    headerHeight: number;
    isDragging: boolean;
    isResizing: boolean;
    isLast: boolean;
    sortDirection: GridSortDirection;
    sortIndex?: number;
    filterItemsCounter?: number;
    hasFocus?: boolean;
    tabIndex: 0 | -1;
    disableReorder?: boolean;
    separatorSide?: GridColumnHeaderSeparatorProps['side'];
    pinnedPosition?: GridPinnedColumnPosition;
    style?: React.CSSProperties;
    indexInSection: number;
    sectionLength: number;
    gridHasFiller: boolean;
}
declare function GridColumnHeaderItem(props: GridColumnHeaderItemProps): React.JSX.Element;
declare namespace GridColumnHeaderItem {
    var propTypes: any;
}
declare const Memoized: typeof GridColumnHeaderItem;
export { Memoized as GridColumnHeaderItem };
