"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MissingRowIdError = void 0;
exports.useGridParamsApi = useGridParamsApi;
var React = _interopRequireWildcard(require("react"));
var _domUtils = require("../../../utils/domUtils");
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _gridFocusStateSelector = require("../focus/gridFocusStateSelector");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class MissingRowIdError extends Error {}

/**
 * @requires useGridColumns (method)
 * @requires useGridRows (method)
 * @requires useGridFocus (state)
 * @requires useGridEditing (method)
 * TODO: Impossible priority - useGridEditing also needs to be after useGridParamsApi
 * TODO: Impossible priority - useGridFocus also needs to be after useGridParamsApi
 */
exports.MissingRowIdError = MissingRowIdError;
function useGridParamsApi(apiRef) {
  const getColumnHeaderParams = React.useCallback(field => ({
    field,
    colDef: apiRef.current.getColumn(field)
  }), [apiRef]);
  const getRowParams = React.useCallback(id => {
    const row = apiRef.current.getRow(id);
    if (!row) {
      throw new MissingRowIdError(`No row with id #${id} found`);
    }
    const params = {
      id,
      columns: apiRef.current.getAllColumns(),
      row
    };
    return params;
  }, [apiRef]);
  const getCellParams = React.useCallback((id, field) => {
    const colDef = apiRef.current.getColumn(field);
    const row = apiRef.current.getRow(id);
    const rowNode = apiRef.current.getRowNode(id);
    if (!row || !rowNode) {
      throw new MissingRowIdError(`No row with id #${id} found`);
    }
    const rawValue = row[field];
    const value = colDef?.valueGetter ? colDef.valueGetter(rawValue, row, colDef, apiRef) : rawValue;
    const cellFocus = (0, _gridFocusStateSelector.gridFocusCellSelector)(apiRef);
    const cellTabIndex = (0, _gridFocusStateSelector.gridTabIndexCellSelector)(apiRef);
    const params = {
      id,
      field,
      row,
      rowNode,
      colDef,
      cellMode: apiRef.current.getCellMode(id, field),
      hasFocus: cellFocus !== null && cellFocus.field === field && cellFocus.id === id,
      tabIndex: cellTabIndex && cellTabIndex.field === field && cellTabIndex.id === id ? 0 : -1,
      value,
      formattedValue: value,
      isEditable: false
    };
    if (colDef && colDef.valueFormatter) {
      params.formattedValue = colDef.valueFormatter(value, row, colDef, apiRef);
    }
    params.isEditable = colDef && apiRef.current.isCellEditable(params);
    return params;
  }, [apiRef]);
  const getCellValue = React.useCallback((id, field) => {
    const colDef = apiRef.current.getColumn(field);
    const row = apiRef.current.getRow(id);
    if (!row) {
      throw new MissingRowIdError(`No row with id #${id} found`);
    }
    if (!colDef || !colDef.valueGetter) {
      return row[field];
    }
    return colDef.valueGetter(row[colDef.field], row, colDef, apiRef);
  }, [apiRef]);
  const getRowValue = React.useCallback((row, colDef) => {
    const field = colDef.field;
    if (!colDef || !colDef.valueGetter) {
      return row[field];
    }
    const value = row[colDef.field];
    return colDef.valueGetter(value, row, colDef, apiRef);
  }, [apiRef]);
  const getRowFormattedValue = React.useCallback((row, colDef) => {
    const value = getRowValue(row, colDef);
    if (!colDef || !colDef.valueFormatter) {
      return value;
    }
    return colDef.valueFormatter(value, row, colDef, apiRef);
  }, [apiRef, getRowValue]);
  const getColumnHeaderElement = React.useCallback(field => {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }
    return (0, _domUtils.getGridColumnHeaderElement)(apiRef.current.rootElementRef.current, field);
  }, [apiRef]);
  const getRowElement = React.useCallback(id => {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }
    return (0, _domUtils.getGridRowElement)(apiRef.current.rootElementRef.current, id);
  }, [apiRef]);
  const getCellElement = React.useCallback((id, field) => {
    if (!apiRef.current.rootElementRef.current) {
      return null;
    }
    return (0, _domUtils.getGridCellElement)(apiRef.current.rootElementRef.current, {
      id,
      field
    });
  }, [apiRef]);
  const paramsApi = {
    getCellValue,
    getCellParams,
    getCellElement,
    getRowValue,
    getRowFormattedValue,
    getRowParams,
    getRowElement,
    getColumnHeaderParams,
    getColumnHeaderElement
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, paramsApi, 'public');
}