"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridVirtualizationSelector = exports.gridVirtualizationEnabledSelector = exports.gridVirtualizationColumnEnabledSelector = exports.gridRenderContextSelector = exports.gridRenderContextColumnsSelector = void 0;
var _createSelector = require("../../../utils/createSelector");
/**
 * Get the columns state
 * @category Virtualization
 */
const gridVirtualizationSelector = state => state.virtualization;

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
exports.gridVirtualizationSelector = gridVirtualizationSelector;
const gridVirtualizationEnabledSelector = exports.gridVirtualizationEnabledSelector = (0, _createSelector.createSelector)(gridVirtualizationSelector, state => state.enabled);

/**
 * Get the enabled state for virtualization
 * @category Virtualization
 */
const gridVirtualizationColumnEnabledSelector = exports.gridVirtualizationColumnEnabledSelector = (0, _createSelector.createSelector)(gridVirtualizationSelector, state => state.enabledForColumns);

/**
 * Get the render context
 * @category Virtualization
 * @ignore - do not document.
 */
const gridRenderContextSelector = exports.gridRenderContextSelector = (0, _createSelector.createSelector)(gridVirtualizationSelector, state => state.renderContext);

/**
 * Get the render context, with only columns filled in.
 * This is cached, so it can be used to only re-render when the column interval changes.
 * @category Virtualization
 * @ignore - do not document.
 */
const gridRenderContextColumnsSelector = exports.gridRenderContextColumnsSelector = (0, _createSelector.createSelectorMemoized)(state => state.virtualization.renderContext.firstColumnIndex, state => state.virtualization.renderContext.lastColumnIndex, (firstColumnIndex, lastColumnIndex) => ({
  firstColumnIndex,
  lastColumnIndex
}));