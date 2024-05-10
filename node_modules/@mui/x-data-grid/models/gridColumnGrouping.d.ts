/// <reference types="react" />
import { GridColDef } from './colDef';
import type { GridColumnGroupHeaderParams } from './params/gridColumnGroupHeaderParams';
export interface GridLeafColumn {
    field: GridColDef['field'];
}
export type GridColumnNode = GridColumnGroup | GridLeafColumn;
export declare function isLeaf(node: GridColumnNode): node is GridLeafColumn;
/**
 * A function used to process headerClassName params.
 */
export type GridColumnGroupHeaderClassFn = (params: GridColumnGroupHeaderParams) => string;
/**
 * The union type representing the [[GridColDef]] column header class type.
 */
export type GridColumnGroupHeaderClassNamePropType = string | GridColumnGroupHeaderClassFn;
export interface GridColumnGroup extends Pick<GridColDef, 'headerName' | 'description' | 'headerAlign'> {
    /**
     * A unique string identifying the group.
     */
    groupId: string;
    /**
     * The groups and columns included in this group.
     */
    children: GridColumnNode[];
    /**
     * If `true`, allows reordering columns outside of the group.
     * @default false
     */
    freeReordering?: boolean;
    /**
     * Allows to render a component in the column group header cell.
     * @param {GridColumnGroupHeaderParams} params Object containing parameters for the renderer.
     * @returns {React.ReactNode} The element to be rendered.
     */
    renderHeaderGroup?: (params: GridColumnGroupHeaderParams) => React.ReactNode;
    /**
     * Class name that will be added in the column group header cell.
     */
    headerClassName?: GridColumnGroupHeaderClassNamePropType;
}
export type GridColumnGroupingModel = GridColumnGroup[];
