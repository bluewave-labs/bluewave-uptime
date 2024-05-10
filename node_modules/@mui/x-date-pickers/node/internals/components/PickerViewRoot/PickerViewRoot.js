"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickerViewRoot = void 0;
var _styles = require("@mui/material/styles");
var _dimensions = require("../../constants/dimensions");
const PickerViewRoot = exports.PickerViewRoot = (0, _styles.styled)('div')({
  overflow: 'hidden',
  width: _dimensions.DIALOG_WIDTH,
  maxHeight: _dimensions.VIEW_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto'
});