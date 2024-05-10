import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
export declare const defaultPageSize: (autoPageSize: boolean) => 0 | 100;
export declare const getPageCount: (rowCount: number, pageSize: number, page: number) => number;
export declare const getDefaultGridPaginationModel: (autoPageSize: boolean) => {
    page: number;
    pageSize: number;
};
export declare const getValidPage: (page: number, pageCount?: number) => number;
export declare const throwIfPageSizeExceedsTheLimit: (pageSize: number, signatureProp: DataGridProcessedProps['signature']) => void;
