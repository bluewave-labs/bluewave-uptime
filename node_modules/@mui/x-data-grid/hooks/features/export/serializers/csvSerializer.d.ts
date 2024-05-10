/// <reference types="react" />
import type { GridCsvExportOptions, GridRowId } from '../../../../models';
import type { GridCellParams } from '../../../../models/params/gridCellParams';
import type { GridStateColDef } from '../../../../models/colDef/gridColDef';
import type { GridApiCommunity } from '../../../../models/api/gridApiCommunity';
export declare const serializeCellValue: (cellParams: GridCellParams, options: {
    delimiterCharacter: string;
    ignoreValueFormatter: boolean;
    shouldAppendQuotes: boolean;
}) => any;
interface BuildCSVOptions {
    columns: GridStateColDef[];
    rowIds: GridRowId[];
    delimiterCharacter: NonNullable<GridCsvExportOptions['delimiter']>;
    includeHeaders: NonNullable<GridCsvExportOptions['includeHeaders']>;
    includeColumnGroupsHeaders: NonNullable<GridCsvExportOptions['includeColumnGroupsHeaders']>;
    ignoreValueFormatter: boolean;
    apiRef: React.MutableRefObject<GridApiCommunity>;
    shouldAppendQuotes: boolean;
}
export declare function buildCSV(options: BuildCSVOptions): string;
export {};
