import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["id", "value", "formattedValue", "api", "field", "row", "rowNode", "colDef", "cellMode", "isEditable", "tabIndex", "className", "hasFocus", "isValidating", "isProcessingProps", "error", "onValueChange", "initialOpen"],
  _excluded2 = ["MenuProps"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { GridCellEditStopReasons } from '../../models/params/gridEditCellParams';
import { isEscapeKey } from '../../utils/keyboardUtils';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { GridEditModes } from '../../models/gridEditRowModel';
import { getValueFromValueOptions, getValueOptions, isSingleSelectColDef } from '../panel/filterPanel/filterPanelUtils';
import { useGridApiContext } from '../../hooks/utils/useGridApiContext';
import { createElement as _createElement } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
function isKeyboardEvent(event) {
  return !!event.key;
}
function GridEditSingleSelectCell(props) {
  const rootProps = useGridRootProps();
  const {
      id,
      value: valueProp,
      field,
      row,
      colDef,
      hasFocus,
      error,
      onValueChange,
      initialOpen = rootProps.editMode === GridEditModes.Cell
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const apiRef = useGridApiContext();
  const ref = React.useRef();
  const inputRef = React.useRef();
  const [open, setOpen] = React.useState(initialOpen);
  const baseSelectProps = rootProps.slotProps?.baseSelect || {};
  const isSelectNative = baseSelectProps.native ?? false;
  const _ref = rootProps.slotProps?.baseSelect || {},
    {
      MenuProps
    } = _ref,
    otherBaseSelectProps = _objectWithoutPropertiesLoose(_ref, _excluded2);
  useEnhancedEffect(() => {
    if (hasFocus) {
      inputRef.current?.focus();
    }
  }, [hasFocus]);
  if (!isSingleSelectColDef(colDef)) {
    return null;
  }
  const valueOptions = getValueOptions(colDef, {
    id,
    row
  });
  if (!valueOptions) {
    return null;
  }
  const getOptionValue = colDef.getOptionValue;
  const getOptionLabel = colDef.getOptionLabel;
  const handleChange = async event => {
    if (!isSingleSelectColDef(colDef) || !valueOptions) {
      return;
    }
    setOpen(false);
    const target = event.target;
    // NativeSelect casts the value to a string.
    const formattedTargetValue = getValueFromValueOptions(target.value, valueOptions, getOptionValue);
    if (onValueChange) {
      await onValueChange(event, formattedTargetValue);
    }
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: formattedTargetValue
    }, event);
  };
  const handleClose = (event, reason) => {
    if (rootProps.editMode === GridEditModes.Row) {
      setOpen(false);
      return;
    }
    if (reason === 'backdropClick' || isEscapeKey(event.key)) {
      const params = apiRef.current.getCellParams(id, field);
      apiRef.current.publishEvent('cellEditStop', _extends({}, params, {
        reason: isEscapeKey(event.key) ? GridCellEditStopReasons.escapeKeyDown : GridCellEditStopReasons.cellFocusOut
      }));
    }
  };
  const handleOpen = event => {
    if (isKeyboardEvent(event) && event.key === 'Enter') {
      return;
    }
    setOpen(true);
  };
  if (!valueOptions || !colDef) {
    return null;
  }
  return /*#__PURE__*/_jsx(rootProps.slots.baseSelect, _extends({
    ref: ref,
    inputRef: inputRef,
    value: valueProp,
    onChange: handleChange,
    open: open,
    onOpen: handleOpen,
    MenuProps: _extends({
      onClose: handleClose
    }, MenuProps),
    error: error,
    native: isSelectNative,
    fullWidth: true
  }, other, otherBaseSelectProps, {
    children: valueOptions.map(valueOption => {
      const value = getOptionValue(valueOption);
      return /*#__PURE__*/_createElement(rootProps.slots.baseSelectOption, _extends({}, rootProps.slotProps?.baseSelectOption || {}, {
        native: isSelectNative,
        key: value,
        value: value
      }), getOptionLabel(valueOption));
    })
  }));
}
process.env.NODE_ENV !== "production" ? GridEditSingleSelectCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * GridApi that let you manipulate the grid.
   */
  api: PropTypes.object.isRequired,
  /**
   * The mode of the cell.
   */
  cellMode: PropTypes.oneOf(['edit', 'view']).isRequired,
  changeReason: PropTypes.oneOf(['debouncedSetEditCellValue', 'setEditCellValue']),
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The column field of the cell that triggered the event.
   */
  field: PropTypes.string.isRequired,
  /**
   * The cell value formatted with the column valueFormatter.
   */
  formattedValue: PropTypes.any,
  /**
   * If true, the cell is the active element.
   */
  hasFocus: PropTypes.bool.isRequired,
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * If true, the select opens by default.
   */
  initialOpen: PropTypes.bool,
  /**
   * If true, the cell is editable.
   */
  isEditable: PropTypes.bool,
  isProcessingProps: PropTypes.bool,
  isValidating: PropTypes.bool,
  /**
   * Callback called when the value is changed by the user.
   * @param {SelectChangeEvent<any>} event The event source of the callback.
   * @param {any} newValue The value that is going to be passed to `apiRef.current.setEditCellValue`.
   * @returns {Promise<void> | void} A promise to be awaited before calling `apiRef.current.setEditCellValue`
   */
  onValueChange: PropTypes.func,
  /**
   * The row model of the row that the current cell belongs to.
   */
  row: PropTypes.any.isRequired,
  /**
   * The node of the row that the current cell belongs to.
   */
  rowNode: PropTypes.object.isRequired,
  /**
   * the tabIndex value.
   */
  tabIndex: PropTypes.oneOf([-1, 0]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any
} : void 0;
export { GridEditSingleSelectCell };
export const renderEditSingleSelectCell = params => /*#__PURE__*/_jsx(GridEditSingleSelectCell, _extends({}, params));