import * as React from 'react';
import { GridToolbarContainerProps } from '../containers/GridToolbarContainer';
import { GridToolbarExportProps } from './GridToolbarExport';
import { GridToolbarQuickFilterProps } from './GridToolbarQuickFilter';
export interface GridToolbarProps extends GridToolbarContainerProps, Omit<GridToolbarExportProps, 'color'> {
    /**
     * Show the quick filter component.
     * @default false
     */
    showQuickFilter?: boolean;
    /**
     * Props passed to the quick filter component.
     */
    quickFilterProps?: GridToolbarQuickFilterProps;
}
declare const GridToolbar: React.ForwardRefExoticComponent<Omit<GridToolbarProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { GridToolbar };
