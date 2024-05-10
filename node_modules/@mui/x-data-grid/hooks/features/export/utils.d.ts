import * as React from 'react';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridExportOptions, GridCsvGetRowsToExportParams } from '../../../models/gridExport';
import { GridStateColDef } from '../../../models/colDef/gridColDef';
import { GridRowId } from '../../../models';
interface GridGetColumnsToExportParams {
    /**
     * The API of the grid.
     */
    apiRef: React.MutableRefObject<GridApiCommunity>;
    options: GridExportOptions;
}
export declare const getColumnsToExport: ({ apiRef, options, }: GridGetColumnsToExportParams) => GridStateColDef[];
export declare const defaultGetRowsToExport: ({ apiRef }: GridCsvGetRowsToExportParams) => GridRowId[];
export {};
