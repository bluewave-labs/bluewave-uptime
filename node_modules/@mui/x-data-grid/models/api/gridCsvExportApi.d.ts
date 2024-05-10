import { GridCsvExportOptions } from '../gridExport';
/**
 * The CSV export API interface that is available in the grid [[apiRef]].
 */
export interface GridCsvExportApi {
    /**
     * Returns the grid data as a CSV string.
     * This method is used internally by `exportDataAsCsv`.
     * @param {GridCsvExportOptions} options The options to apply on the export.
     * @returns {string} The data in the CSV format.
     */
    getDataAsCsv: (options?: GridCsvExportOptions) => string;
    /**
     * Downloads and exports a CSV of the grid's data.
     * @param {GridCsvExportOptions} options The options to apply on the export.
     */
    exportDataAsCsv: (options?: GridCsvExportOptions) => void;
}
