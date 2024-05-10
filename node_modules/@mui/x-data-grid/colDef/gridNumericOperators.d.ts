import { GridFilterOperator } from '../models/gridFilterOperator';
import type { GetApplyQuickFilterFn } from '../models/colDef/gridColDef';
export declare const getGridNumericQuickFilterFn: GetApplyQuickFilterFn<any, number | string | null>;
export declare const getGridNumericOperators: () => GridFilterOperator<any, number | string | null, any>[];
