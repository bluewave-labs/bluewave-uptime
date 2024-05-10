"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridDefaultColumnTypes = exports.DEFAULT_GRID_COL_TYPE_KEY = void 0;
var _gridStringColDef = require("./gridStringColDef");
var _gridNumericColDef = require("./gridNumericColDef");
var _gridDateColDef = require("./gridDateColDef");
var _gridBooleanColDef = require("./gridBooleanColDef");
var _gridSingleSelectColDef = require("./gridSingleSelectColDef");
var _gridActionsColDef = require("./gridActionsColDef");
const DEFAULT_GRID_COL_TYPE_KEY = exports.DEFAULT_GRID_COL_TYPE_KEY = 'string';
const getGridDefaultColumnTypes = () => {
  const nativeColumnTypes = {
    string: _gridStringColDef.GRID_STRING_COL_DEF,
    number: _gridNumericColDef.GRID_NUMERIC_COL_DEF,
    date: _gridDateColDef.GRID_DATE_COL_DEF,
    dateTime: _gridDateColDef.GRID_DATETIME_COL_DEF,
    boolean: _gridBooleanColDef.GRID_BOOLEAN_COL_DEF,
    singleSelect: _gridSingleSelectColDef.GRID_SINGLE_SELECT_COL_DEF,
    [_gridActionsColDef.GRID_ACTIONS_COLUMN_TYPE]: _gridActionsColDef.GRID_ACTIONS_COL_DEF,
    custom: _gridStringColDef.GRID_STRING_COL_DEF
  };
  return nativeColumnTypes;
};
exports.getGridDefaultColumnTypes = getGridDefaultColumnTypes;