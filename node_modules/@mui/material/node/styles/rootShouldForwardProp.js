"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slotShouldForwardProp = _interopRequireDefault(require("./slotShouldForwardProp"));
const rootShouldForwardProp = prop => (0, _slotShouldForwardProp.default)(prop) && prop !== 'classes';
var _default = exports.default = rootShouldForwardProp;