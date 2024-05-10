"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridHeaderFilteringStateSelector = exports.gridHeaderFilteringMenuSelector = exports.gridHeaderFilteringEnabledSelector = exports.gridHeaderFilteringEditFieldSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
const gridHeaderFilteringStateSelector = state => state.headerFiltering;
exports.gridHeaderFilteringStateSelector = gridHeaderFilteringStateSelector;
const gridHeaderFilteringEnabledSelector = exports.gridHeaderFilteringEnabledSelector = (0, _createSelector.createSelector)(gridHeaderFilteringStateSelector,
// No initialization in MIT, so we need to default to false to be used by `getTotalHeaderHeight`
headerFilteringState => headerFilteringState?.enabled ?? false);
const gridHeaderFilteringEditFieldSelector = exports.gridHeaderFilteringEditFieldSelector = (0, _createSelector.createSelector)(gridHeaderFilteringStateSelector, headerFilteringState => headerFilteringState.editing);
const gridHeaderFilteringMenuSelector = exports.gridHeaderFilteringMenuSelector = (0, _createSelector.createSelector)(gridHeaderFilteringStateSelector, headerFilteringState => headerFilteringState.menuOpen);