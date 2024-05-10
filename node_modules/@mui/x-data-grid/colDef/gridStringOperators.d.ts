import type { GetApplyQuickFilterFn } from '../models/colDef/gridColDef';
import { GridFilterOperator } from '../models/gridFilterOperator';
export declare const getGridStringQuickFilterFn: GetApplyQuickFilterFn<any, unknown>;
export declare const getGridStringOperators: (disableTrim?: boolean) => GridFilterOperator<any, number | string | null, any>[];
