"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMultipleRowSelectionEnabled = isMultipleRowSelectionEnabled;
var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");
function isMultipleRowSelectionEnabled(props) {
  if (props.signature === _useGridApiEventHandler.GridSignature.DataGrid) {
    // DataGrid Community has multiple row selection enabled only if checkbox selection is enabled.
    return props.checkboxSelection && props.disableMultipleRowSelection !== true;
  }
  return !props.disableMultipleRowSelection;
}