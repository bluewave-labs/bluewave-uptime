import { createSelector, createSelectorMemoized } from '../../../utils/createSelector';
/**
 * Get the columns state
 * @category Virtualization
 */
export const gridVirtualizationSelector = state => state.virtualization;

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export const gridVirtualizationEnabledSelector = createSelector(gridVirtualizationSelector, state => state.enabled);

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
export const gridVirtualizationColumnEnabledSelector = createSelector(gridVirtualizationSelector, state => state.enabledForColumns);

/**
 * Get the render context
 * @category Virtualization
 * @ignore - do not document.
 */
export const gridRenderContextSelector = createSelector(gridVirtualizationSelector, state => state.renderContext);

/**
 * Get the render context, with only columns filled in.
 * This is cached, so it can be used to only re-render when the column interval changes.
 * @category Virtualization
 * @ignore - do not document.
 */
export const gridRenderContextColumnsSelector = createSelectorMemoized(state => state.virtualization.renderContext.firstColumnIndex, state => state.virtualization.renderContext.lastColumnIndex, (firstColumnIndex, lastColumnIndex) => ({
  firstColumnIndex,
  lastColumnIndex
}));