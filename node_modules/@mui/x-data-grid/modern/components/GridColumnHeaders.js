import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "visibleColumns", "sortColumnLookup", "filterColumnLookup", "columnHeaderTabIndexState", "columnGroupHeaderTabIndexState", "columnHeaderFocus", "columnGroupHeaderFocus", "headerGroupingMaxDepth", "columnMenuState", "columnVisibility", "columnGroupsHeaderStructure", "hasOtherElementInTabSequence"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { fastMemo } from '../utils/fastMemo';
import { useGridColumnHeaders } from '../hooks/features/columnHeaders/useGridColumnHeaders';
import { GridBaseColumnHeaders } from './columnHeaders/GridBaseColumnHeaders';
import { jsxs as _jsxs } from "react/jsx-runtime";
const GridColumnHeaders = /*#__PURE__*/React.forwardRef(function GridColumnHeaders(props, ref) {
  const {
      visibleColumns,
      sortColumnLookup,
      filterColumnLookup,
      columnHeaderTabIndexState,
      columnGroupHeaderTabIndexState,
      columnHeaderFocus,
      columnGroupHeaderFocus,
      headerGroupingMaxDepth,
      columnMenuState,
      columnVisibility,
      columnGroupsHeaderStructure,
      hasOtherElementInTabSequence
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    getInnerProps,
    getColumnHeadersRow,
    getColumnGroupHeadersRows
  } = useGridColumnHeaders({
    visibleColumns,
    sortColumnLookup,
    filterColumnLookup,
    columnHeaderTabIndexState,
    columnGroupHeaderTabIndexState,
    columnHeaderFocus,
    columnGroupHeaderFocus,
    headerGroupingMaxDepth,
    columnMenuState,
    columnVisibility,
    columnGroupsHeaderStructure,
    hasOtherElementInTabSequence
  });
  return /*#__PURE__*/_jsxs(GridBaseColumnHeaders, _extends({
    ref: ref
  }, other, getInnerProps(), {
    children: [getColumnGroupHeadersRows(), getColumnHeadersRow()]
  }));
});
process.env.NODE_ENV !== "production" ? GridColumnHeaders.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  columnGroupHeaderFocus: PropTypes.shape({
    depth: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired
  }),
  columnGroupHeaderTabIndexState: PropTypes.shape({
    depth: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired
  }),
  columnGroupsHeaderStructure: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    columnFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    groupId: PropTypes.string
  }))).isRequired,
  columnHeaderFocus: PropTypes.shape({
    field: PropTypes.string.isRequired
  }),
  columnHeaderTabIndexState: PropTypes.shape({
    field: PropTypes.string.isRequired
  }),
  columnMenuState: PropTypes.shape({
    field: PropTypes.string,
    open: PropTypes.bool.isRequired
  }).isRequired,
  columnVisibility: PropTypes.object.isRequired,
  filterColumnLookup: PropTypes.object.isRequired,
  hasOtherElementInTabSequence: PropTypes.bool.isRequired,
  headerGroupingMaxDepth: PropTypes.number.isRequired,
  sortColumnLookup: PropTypes.object.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.object).isRequired
} : void 0;
const MemoizedGridColumnHeaders = fastMemo(GridColumnHeaders);
export { MemoizedGridColumnHeaders as GridColumnHeaders };