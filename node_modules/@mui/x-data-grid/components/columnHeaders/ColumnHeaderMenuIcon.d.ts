import * as React from 'react';
import { GridStateColDef } from '../../models/colDef/gridColDef';
export interface ColumnHeaderMenuIconProps {
    colDef: GridStateColDef;
    columnMenuId: string;
    columnMenuButtonId: string;
    open: boolean;
    iconButtonRef: React.RefObject<HTMLButtonElement>;
}
export declare const ColumnHeaderMenuIcon: React.MemoExoticComponent<(props: ColumnHeaderMenuIconProps) => React.JSX.Element>;
