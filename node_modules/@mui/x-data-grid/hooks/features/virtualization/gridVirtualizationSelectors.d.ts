import type { GridColumnsRenderContext } from '../../../models/params/gridScrollParams';
import type { GridStateCommunity } from '../../../models/gridStateCommunity';
/**
 * Get the columns state
 * @category Virtualization
 */
export declare const gridVirtualizationSelector: (state: GridStateCommunity) => import("./useGridVirtualization").GridVirtualizationState;
/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export declare const gridVirtualizationEnabledSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, boolean>;
/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export declare const gridVirtualizationColumnEnabledSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, boolean>;
/**
 * Get the render context
 * @category Virtualization
 * @ignore - do not document.
 */
export declare const gridRenderContextSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, import("../../../models/params/gridScrollParams").GridRenderContext>;
/**
 * Get the render context, with only columns filled in.
 * This is cached, so it can be used to only re-render when the column interval changes.
 * @category Virtualization
 * @ignore - do not document.
 */
export declare const gridRenderContextColumnsSelector: import("../../../utils/createSelector").OutputSelector<GridStateCommunity, GridColumnsRenderContext>;
