"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridBooleanOperators = void 0;
var _GridFilterInputBoolean = require("../components/panel/filterPanel/GridFilterInputBoolean");
const getGridBooleanOperators = () => [{
  value: 'is',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const valueAsBoolean = String(filterItem.value) === 'true';
    return value => {
      return Boolean(value) === valueAsBoolean;
    };
  },
  InputComponent: _GridFilterInputBoolean.GridFilterInputBoolean
}];
exports.getGridBooleanOperators = getGridBooleanOperators;