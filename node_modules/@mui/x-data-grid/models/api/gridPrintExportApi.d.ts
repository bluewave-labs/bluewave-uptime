import { GridPrintExportOptions } from '../gridExport';
/**
 * The Print export API interface that is available in the grid [[apiRef]].
 */
export interface GridPrintExportApi {
    /**
     * Print the grid's data.
     * @param {GridPrintExportOptions} options The options to apply on the export.
     */
    exportDataAsPrint: (options?: GridPrintExportOptions) => void;
}
