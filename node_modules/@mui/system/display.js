"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whiteSpace = exports.visibility = exports.textOverflow = exports.overflow = exports.displayRaw = exports.displayPrint = exports.default = void 0;
var _style = _interopRequireDefault(require("./style"));
var _compose = _interopRequireDefault(require("./compose"));
const displayPrint = exports.displayPrint = (0, _style.default)({
  prop: 'displayPrint',
  cssProperty: false,
  transform: value => ({
    '@media print': {
      display: value
    }
  })
});
const displayRaw = exports.displayRaw = (0, _style.default)({
  prop: 'display'
});
const overflow = exports.overflow = (0, _style.default)({
  prop: 'overflow'
});
const textOverflow = exports.textOverflow = (0, _style.default)({
  prop: 'textOverflow'
});
const visibility = exports.visibility = (0, _style.default)({
  prop: 'visibility'
});
const whiteSpace = exports.whiteSpace = (0, _style.default)({
  prop: 'whiteSpace'
});
var _default = exports.default = (0, _compose.default)(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);