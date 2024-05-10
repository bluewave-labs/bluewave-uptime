import * as React from 'react';
import { GridColDef } from '../../../models/colDef/gridColDef';
export interface GridColumnMenuItemProps {
    colDef: GridColDef;
    onClick: (event: React.MouseEvent<any>) => void;
    [key: string]: any;
}
