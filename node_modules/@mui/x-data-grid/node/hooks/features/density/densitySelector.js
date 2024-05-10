"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridDensitySelector = exports.gridDensityFactorSelector = exports.COMPACT_DENSITY_FACTOR = exports.COMFORTABLE_DENSITY_FACTOR = void 0;
var _createSelector = require("../../../utils/createSelector");
const COMPACT_DENSITY_FACTOR = exports.COMPACT_DENSITY_FACTOR = 0.7;
const COMFORTABLE_DENSITY_FACTOR = exports.COMFORTABLE_DENSITY_FACTOR = 1.3;
const DENSITY_FACTORS = {
  compact: COMPACT_DENSITY_FACTOR,
  comfortable: COMFORTABLE_DENSITY_FACTOR,
  standard: 1
};
const gridDensitySelector = state => state.density;
exports.gridDensitySelector = gridDensitySelector;
const gridDensityFactorSelector = exports.gridDensityFactorSelector = (0, _createSelector.createSelector)(gridDensitySelector, density => DENSITY_FACTORS[density]);