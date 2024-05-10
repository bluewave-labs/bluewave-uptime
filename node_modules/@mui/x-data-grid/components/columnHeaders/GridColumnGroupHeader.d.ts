import * as React from 'react';
import { GridPinnedColumnPosition } from '../../hooks/features/columns/gridColumnsInterfaces';
interface GridColumnGroupHeaderProps {
    groupId: string | null;
    width: number;
    fields: string[];
    colIndex: number;
    isLastColumn: boolean;
    depth: number;
    maxDepth: number;
    height: number;
    hasFocus?: boolean;
    tabIndex: 0 | -1;
    pinnedPosition?: GridPinnedColumnPosition;
    style?: React.CSSProperties;
    indexInSection: number;
    sectionLength: number;
    gridHasFiller: boolean;
}
declare function GridColumnGroupHeader(props: GridColumnGroupHeaderProps): React.JSX.Element;
export { GridColumnGroupHeader };
