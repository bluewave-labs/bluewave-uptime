import { GridStateCommunity } from '../../../models/gridStateCommunity';
export declare const gridHeaderFilteringStateSelector: (state: GridStateCommunity) => import("../../../models/gridHeaderFilteringModel").GridHeaderFilteringState;
export declare const gridHeaderFilteringEnabledSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, boolean>;
export declare const gridHeaderFilteringEditFieldSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, string | null>;
export declare const gridHeaderFilteringMenuSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, string | null>;
