import { SvgIconProps } from '@mui/material/SvgIcon';
import * as React from 'react';
import { GridSortDirection } from '../../models/gridSortModel';
interface GridColumnUnsortedIconProps extends SvgIconProps {
    sortingOrder: GridSortDirection[];
}
export declare const GridColumnUnsortedIcon: React.NamedExoticComponent<GridColumnUnsortedIconProps>;
export {};
