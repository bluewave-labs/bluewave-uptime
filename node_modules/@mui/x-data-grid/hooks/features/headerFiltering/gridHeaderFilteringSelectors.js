import { createSelector } from '../../../utils/createSelector';
export const gridHeaderFilteringStateSelector = state => state.headerFiltering;
export const gridHeaderFilteringEnabledSelector = createSelector(gridHeaderFilteringStateSelector,
// No initialization in MIT, so we need to default to false to be used by `getTotalHeaderHeight`
headerFilteringState => headerFilteringState?.enabled ?? false);
export const gridHeaderFilteringEditFieldSelector = createSelector(gridHeaderFilteringStateSelector, headerFilteringState => headerFilteringState.editing);
export const gridHeaderFilteringMenuSelector = createSelector(gridHeaderFilteringStateSelector, headerFilteringState => headerFilteringState.menuOpen);