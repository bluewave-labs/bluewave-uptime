import { GridPaginationMeta, GridPaginationModel } from '../../../models/gridPaginationProps';
export interface GridPaginationState {
    paginationModel: GridPaginationModel;
    rowCount: number;
    meta: GridPaginationMeta;
}
export interface GridPaginationInitialState {
    paginationModel?: Partial<GridPaginationModel>;
    rowCount?: number;
    meta?: GridPaginationMeta;
}
/**
 * The pagination model API interface that is available in the grid `apiRef`.
 */
export interface GridPaginationModelApi {
    /**
     * Sets the displayed page to the value given by `page`.
     * @param {number} page The new page number.
     */
    setPage: (page: number) => void;
    /**
     * Sets the number of displayed rows to the value given by `pageSize`.
     * @param {number} pageSize The new number of displayed rows.
     */
    setPageSize: (pageSize: number) => void;
    /**
     * Sets the `paginationModel` to a new value.
     * @param {GridPaginationModel} model The new model value.
     */
    setPaginationModel: (model: GridPaginationModel) => void;
}
/**
 * The pagination row count API interface that is available in the grid `apiRef`.
 */
export interface GridPaginationRowCountApi {
    /**
     * Sets the `rowCount` to a new value.
     * @param {number} rowCount The new row count value.
     */
    setRowCount: (rowCount: number) => void;
}
/**
 * The pagination meta API interface that is available in the grid `apiRef`.
 */
export interface GridPaginationMetaApi {
    /**
     * Sets the `paginationMeta` to a new value.
     * @param {GridPaginationMeta} paginationMeta The new pagination meta value.
     */
    setPaginationMeta: (paginationMeta: GridPaginationMeta) => void;
}
/**
 * The pagination API interface that is available in the grid `apiRef`.
 */
export interface GridPaginationApi extends GridPaginationModelApi, GridPaginationRowCountApi, GridPaginationMetaApi {
}
