/// <reference types="react" />
import { DataGridProcessedProps } from '../models/props/DataGridProps';
import { GridApiCommunity, GridPrivateApiCommunity } from '../models/api/gridApiCommunity';
export declare const useDataGridComponent: (inputApiRef: React.MutableRefObject<GridApiCommunity> | undefined, props: DataGridProcessedProps) => import("react").MutableRefObject<GridPrivateApiCommunity>;
