import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["className", "csvOptions", "printOptions", "excelOptions", "showQuickFilter", "quickFilterProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { GridToolbarContainer } from '../containers/GridToolbarContainer';
import { GridToolbarColumnsButton } from './GridToolbarColumnsButton';
import { GridToolbarDensitySelector } from './GridToolbarDensitySelector';
import { GridToolbarFilterButton } from './GridToolbarFilterButton';
import { GridToolbarExport } from './GridToolbarExport';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { GridToolbarQuickFilter } from './GridToolbarQuickFilter';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const GridToolbar = /*#__PURE__*/React.forwardRef(function GridToolbar(props, ref) {
  // TODO v7: think about where export option should be passed.
  // from slotProps={{ toolbarExport: { ...exportOption } }} seems to be more appropriate
  const {
      csvOptions,
      printOptions,
      excelOptions,
      showQuickFilter = false,
      quickFilterProps = {}
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const rootProps = useGridRootProps();
  if (rootProps.disableColumnFilter && rootProps.disableColumnSelector && rootProps.disableDensitySelector && !showQuickFilter) {
    return null;
  }
  return /*#__PURE__*/_jsxs(GridToolbarContainer, _extends({
    ref: ref
  }, other, {
    children: [/*#__PURE__*/_jsx(GridToolbarColumnsButton, {}), /*#__PURE__*/_jsx(GridToolbarFilterButton, {}), /*#__PURE__*/_jsx(GridToolbarDensitySelector, {}), /*#__PURE__*/_jsx(GridToolbarExport, {
      csvOptions: csvOptions,
      printOptions: printOptions
      // TODO: remove the reference to excelOptions in community package
      ,
      excelOptions: excelOptions
    }), /*#__PURE__*/_jsx(Box, {
      sx: {
        flex: 1
      }
    }), showQuickFilter && /*#__PURE__*/_jsx(GridToolbarQuickFilter, _extends({}, quickFilterProps))]
  }));
});
process.env.NODE_ENV !== "production" ? GridToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Props passed to the quick filter component.
   */
  quickFilterProps: PropTypes.object,
  /**
   * Show the quick filter component.
   * @default false
   */
  showQuickFilter: PropTypes.bool,
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;
export { GridToolbar };