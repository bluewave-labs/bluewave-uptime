"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zIndex = exports.top = exports.right = exports.position = exports.left = exports.default = exports.bottom = void 0;
var _style = _interopRequireDefault(require("./style"));
var _compose = _interopRequireDefault(require("./compose"));
const position = exports.position = (0, _style.default)({
  prop: 'position'
});
const zIndex = exports.zIndex = (0, _style.default)({
  prop: 'zIndex',
  themeKey: 'zIndex'
});
const top = exports.top = (0, _style.default)({
  prop: 'top'
});
const right = exports.right = (0, _style.default)({
  prop: 'right'
});
const bottom = exports.bottom = (0, _style.default)({
  prop: 'bottom'
});
const left = exports.left = (0, _style.default)({
  prop: 'left'
});
var _default = exports.default = (0, _compose.default)(position, zIndex, top, right, bottom, left);