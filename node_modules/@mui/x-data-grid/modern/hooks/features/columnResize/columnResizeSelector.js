import { createSelector } from '../../../utils/createSelector';
export const gridColumnResizeSelector = state => state.columnResize;
export const gridResizingColumnFieldSelector = createSelector(gridColumnResizeSelector, columnResize => columnResize.resizingColumnField);