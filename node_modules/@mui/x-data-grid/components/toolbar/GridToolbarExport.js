import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["hideMenu", "options"],
  _excluded2 = ["hideMenu", "options"],
  _excluded3 = ["csvOptions", "printOptions", "excelOptions"];
import * as React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { GridToolbarExportContainer } from './GridToolbarExportContainer';
import { jsx as _jsx } from "react/jsx-runtime";
export function GridCsvExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const {
      hideMenu,
      options
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/_jsx(MenuItem, _extends({
    onClick: () => {
      apiRef.current.exportDataAsCsv(options);
      hideMenu?.();
    }
  }, other, {
    children: apiRef.current.getLocaleText('toolbarExportCSV')
  }));
}
export function GridPrintExportMenuItem(props) {
  const apiRef = useGridApiContext();
  const {
      hideMenu,
      options
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded2);
  return /*#__PURE__*/_jsx(MenuItem, _extends({
    onClick: () => {
      apiRef.current.exportDataAsPrint(options);
      hideMenu?.();
    }
  }, other, {
    children: apiRef.current.getLocaleText('toolbarExportPrint')
  }));
}
const GridToolbarExport = /*#__PURE__*/React.forwardRef(function GridToolbarExport(props, ref) {
  const {
      csvOptions = {},
      printOptions = {},
      excelOptions
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded3);
  const apiRef = useGridApiContext();
  const preProcessedButtons = apiRef.current.unstable_applyPipeProcessors('exportMenu', [], {
    excelOptions,
    csvOptions,
    printOptions
  }).sort((a, b) => a.componentName > b.componentName ? 1 : -1);
  if (preProcessedButtons.length === 0) {
    return null;
  }
  return /*#__PURE__*/_jsx(GridToolbarExportContainer, _extends({}, other, {
    ref: ref,
    children: preProcessedButtons.map((button, index) => /*#__PURE__*/React.cloneElement(button.component, {
      key: index
    }))
  }));
});
process.env.NODE_ENV !== "production" ? GridToolbarExport.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  csvOptions: PropTypes.object,
  printOptions: PropTypes.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.object
} : void 0;
export { GridToolbarExport };