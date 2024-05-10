"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridEditSingleSelectCell = GridEditSingleSelectCell;
exports.renderEditSingleSelectCell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var React = _react;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/utils");
var _gridEditCellParams = require("../../models/params/gridEditCellParams");
var _keyboardUtils = require("../../utils/keyboardUtils");
var _useGridRootProps = require("../../hooks/utils/useGridRootProps");
var _gridEditRowModel = require("../../models/gridEditRowModel");
var _filterPanelUtils = require("../panel/filterPanel/filterPanelUtils");
var _useGridApiContext = require("../../hooks/utils/useGridApiContext");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["id", "value", "formattedValue", "api", "field", "row", "rowNode", "colDef", "cellMode", "isEditable", "tabIndex", "className", "hasFocus", "isValidating", "isProcessingProps", "error", "onValueChange", "initialOpen"],
  _excluded2 = ["MenuProps"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function isKeyboardEvent(event) {
  return !!event.key;
}
function GridEditSingleSelectCell(props) {
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  const {
      id,
      value: valueProp,
      field,
      row,
      colDef,
      hasFocus,
      error,
      onValueChange,
      initialOpen = rootProps.editMode === _gridEditRowModel.GridEditModes.Cell
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const ref = React.useRef();
  const inputRef = React.useRef();
  const [open, setOpen] = React.useState(initialOpen);
  const baseSelectProps = rootProps.slotProps?.baseSelect || {};
  const isSelectNative = baseSelectProps.native ?? false;
  const _ref = rootProps.slotProps?.baseSelect || {},
    {
      MenuProps
    } = _ref,
    otherBaseSelectProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
  (0, _utils.unstable_useEnhancedEffect)(() => {
    if (hasFocus) {
      inputRef.current?.focus();
    }
  }, [hasFocus]);
  if (!(0, _filterPanelUtils.isSingleSelectColDef)(colDef)) {
    return null;
  }
  const valueOptions = (0, _filterPanelUtils.getValueOptions)(colDef, {
    id,
    row
  });
  if (!valueOptions) {
    return null;
  }
  const getOptionValue = colDef.getOptionValue;
  const getOptionLabel = colDef.getOptionLabel;
  const handleChange = async event => {
    if (!(0, _filterPanelUtils.isSingleSelectColDef)(colDef) || !valueOptions) {
      return;
    }
    setOpen(false);
    const target = event.target;
    // NativeSelect casts the value to a string.
    const formattedTargetValue = (0, _filterPanelUtils.getValueFromValueOptions)(target.value, valueOptions, getOptionValue);
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
    if (rootProps.editMode === _gridEditRowModel.GridEditModes.Row) {
      setOpen(false);
      return;
    }
    if (reason === 'backdropClick' || (0, _keyboardUtils.isEscapeKey)(event.key)) {
      const params = apiRef.current.getCellParams(id, field);
      apiRef.current.publishEvent('cellEditStop', (0, _extends2.default)({}, params, {
        reason: (0, _keyboardUtils.isEscapeKey)(event.key) ? _gridEditCellParams.GridCellEditStopReasons.escapeKeyDown : _gridEditCellParams.GridCellEditStopReasons.cellFocusOut
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.baseSelect, (0, _extends2.default)({
    ref: ref,
    inputRef: inputRef,
    value: valueProp,
    onChange: handleChange,
    open: open,
    onOpen: handleOpen,
    MenuProps: (0, _extends2.default)({
      onClose: handleClose
    }, MenuProps),
    error: error,
    native: isSelectNative,
    fullWidth: true
  }, other, otherBaseSelectProps, {
    children: valueOptions.map(valueOption => {
      const value = getOptionValue(valueOption);
      return /*#__PURE__*/(0, _react.createElement)(rootProps.slots.baseSelectOption, (0, _extends2.default)({}, rootProps.slotProps?.baseSelectOption || {}, {
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
  api: _propTypes.default.object.isRequired,
  /**
   * The mode of the cell.
   */
  cellMode: _propTypes.default.oneOf(['edit', 'view']).isRequired,
  changeReason: _propTypes.default.oneOf(['debouncedSetEditCellValue', 'setEditCellValue']),
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: _propTypes.default.object.isRequired,
  /**
   * The column field of the cell that triggered the event.
   */
  field: _propTypes.default.string.isRequired,
  /**
   * The cell value formatted with the column valueFormatter.
   */
  formattedValue: _propTypes.default.any,
  /**
   * If true, the cell is the active element.
   */
  hasFocus: _propTypes.default.bool.isRequired,
  /**
   * The grid row id.
   */
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  /**
   * If true, the select opens by default.
   */
  initialOpen: _propTypes.default.bool,
  /**
   * If true, the cell is editable.
   */
  isEditable: _propTypes.default.bool,
  isProcessingProps: _propTypes.default.bool,
  isValidating: _propTypes.default.bool,
  /**
   * Callback called when the value is changed by the user.
   * @param {SelectChangeEvent<any>} event The event source of the callback.
   * @param {any} newValue The value that is going to be passed to `apiRef.current.setEditCellValue`.
   * @returns {Promise<void> | void} A promise to be awaited before calling `apiRef.current.setEditCellValue`
   */
  onValueChange: _propTypes.default.func,
  /**
   * The row model of the row that the current cell belongs to.
   */
  row: _propTypes.default.any.isRequired,
  /**
   * The node of the row that the current cell belongs to.
   */
  rowNode: _propTypes.default.object.isRequired,
  /**
   * the tabIndex value.
   */
  tabIndex: _propTypes.default.oneOf([-1, 0]).isRequired,
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: _propTypes.default.any
} : void 0;
const renderEditSingleSelectCell = params => /*#__PURE__*/(0, _jsxRuntime.jsx)(GridEditSingleSelectCell, (0, _extends2.default)({}, params));
exports.renderEditSingleSelectCell = renderEditSingleSelectCell;