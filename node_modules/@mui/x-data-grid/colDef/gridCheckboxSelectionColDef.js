import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridCellCheckboxRenderer } from '../components/columnSelection/GridCellCheckboxRenderer';
import { GridHeaderCheckbox } from '../components/columnSelection/GridHeaderCheckbox';
import { selectedIdsLookupSelector } from '../hooks/features/rowSelection/gridRowSelectionSelector';
import { GRID_BOOLEAN_COL_DEF } from './gridBooleanColDef';
import { jsx as _jsx } from "react/jsx-runtime";
export const GRID_CHECKBOX_SELECTION_FIELD = '__check__';
export const GRID_CHECKBOX_SELECTION_COL_DEF = _extends({}, GRID_BOOLEAN_COL_DEF, {
  type: 'custom',
  field: GRID_CHECKBOX_SELECTION_FIELD,
  width: 50,
  resizable: false,
  sortable: false,
  filterable: false,
  // @ts-ignore
  aggregable: false,
  disableColumnMenu: true,
  disableReorder: true,
  disableExport: true,
  getApplyQuickFilterFn: undefined,
  display: 'flex',
  valueGetter: (value, row, column, apiRef) => {
    const selectionLookup = selectedIdsLookupSelector(apiRef);
    const rowId = apiRef.current.getRowId(row);
    return selectionLookup[rowId] !== undefined;
  },
  renderHeader: params => /*#__PURE__*/_jsx(GridHeaderCheckbox, _extends({}, params)),
  renderCell: params => /*#__PURE__*/_jsx(GridCellCheckboxRenderer, _extends({}, params))
});