"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.order = exports.justifySelf = exports.justifyItems = exports.justifyContent = exports.flexWrap = exports.flexShrink = exports.flexGrow = exports.flexDirection = exports.flexBasis = exports.flex = exports.default = exports.alignSelf = exports.alignItems = exports.alignContent = void 0;
var _style = _interopRequireDefault(require("./style"));
var _compose = _interopRequireDefault(require("./compose"));
const flexBasis = exports.flexBasis = (0, _style.default)({
  prop: 'flexBasis'
});
const flexDirection = exports.flexDirection = (0, _style.default)({
  prop: 'flexDirection'
});
const flexWrap = exports.flexWrap = (0, _style.default)({
  prop: 'flexWrap'
});
const justifyContent = exports.justifyContent = (0, _style.default)({
  prop: 'justifyContent'
});
const alignItems = exports.alignItems = (0, _style.default)({
  prop: 'alignItems'
});
const alignContent = exports.alignContent = (0, _style.default)({
  prop: 'alignContent'
});
const order = exports.order = (0, _style.default)({
  prop: 'order'
});
const flex = exports.flex = (0, _style.default)({
  prop: 'flex'
});
const flexGrow = exports.flexGrow = (0, _style.default)({
  prop: 'flexGrow'
});
const flexShrink = exports.flexShrink = (0, _style.default)({
  prop: 'flexShrink'
});
const alignSelf = exports.alignSelf = (0, _style.default)({
  prop: 'alignSelf'
});
const justifyItems = exports.justifyItems = (0, _style.default)({
  prop: 'justifyItems'
});
const justifySelf = exports.justifySelf = (0, _style.default)({
  prop: 'justifySelf'
});
const flexbox = (0, _compose.default)(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var _default = exports.default = flexbox;