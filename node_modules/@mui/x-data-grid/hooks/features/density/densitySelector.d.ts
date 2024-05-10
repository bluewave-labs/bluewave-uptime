import { GridStateCommunity } from '../../../models/gridStateCommunity';
import { GridDensity } from '../../../models/gridDensity';
export declare const COMPACT_DENSITY_FACTOR = 0.7;
export declare const COMFORTABLE_DENSITY_FACTOR = 1.3;
export declare const gridDensitySelector: (state: GridStateCommunity) => GridDensity;
export declare const gridDensityFactorSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, number>;
