import type { GridColDef, GridSingleSelectColDef } from '../../../models/colDef/gridColDef';
import type { GridValueOptionsParams } from '../../../models/params/gridValueOptionsParams';
export declare function isSingleSelectColDef(colDef: GridColDef | null): colDef is GridSingleSelectColDef;
export declare function getValueOptions(column: GridSingleSelectColDef, additionalParams?: Omit<GridValueOptionsParams, 'field'>): import("../../../models/colDef/gridColDef").ValueOptions[] | undefined;
export declare function getValueFromValueOptions(value: string, valueOptions: any[] | undefined, getOptionValue: NonNullable<GridSingleSelectColDef['getOptionValue']>): any;
