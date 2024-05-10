import * as React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { GridFilterItem } from '../../../models/gridFilterItem';
import { GridFilterFormProps } from './GridFilterForm';
import { GridColDef, GridStateColDef } from '../../../models/colDef/gridColDef';
export interface GetColumnForNewFilterArgs {
    currentFilters: GridFilterItem[];
    columns: GridStateColDef[];
}
export interface GridFilterPanelProps extends Pick<GridFilterFormProps, 'logicOperators' | 'columnsSort'> {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * Function that returns the next filter item to be picked as default filter.
     * @param {GetColumnForNewFilterArgs} args Currently configured filters and columns.
     * @returns {GridColDef['field']} The field to be used for the next filter or `null` to prevent adding a filter.
     */
    getColumnForNewFilter?: (args: GetColumnForNewFilterArgs) => GridColDef['field'] | null;
    /**
     * Props passed to each filter form.
     */
    filterFormProps?: Pick<GridFilterFormProps, 'columnsSort' | 'deleteIconProps' | 'logicOperatorInputProps' | 'operatorInputProps' | 'columnInputProps' | 'valueInputProps' | 'filterColumns'>;
    /**
     * If `true`, the `Add filter` button will not be displayed.
     * @default false
     */
    disableAddFilterButton?: boolean;
    /**
     * If `true`, the `Remove all` button will be disabled
     * @default false
     */
    disableRemoveAllButton?: boolean;
    /**
     * @ignore - do not document.
     */
    children?: React.ReactNode;
}
declare const getGridFilter: (col: GridStateColDef) => GridFilterItem;
declare const GridFilterPanel: React.ForwardRefExoticComponent<GridFilterPanelProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Demos:
 * - [Filtering - overview](https://mui.com/x/react-data-grid/filtering/)
 *
 * API:
 * - [GridFilterPanel API](https://mui.com/x/api/data-grid/grid-filter-panel/)
 */
export { GridFilterPanel, getGridFilter };
