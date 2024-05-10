"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "rootShouldForwardProp", {
  enumerable: true,
  get: function () {
    return _rootShouldForwardProp.default;
  }
});
Object.defineProperty(exports, "slotShouldForwardProp", {
  enumerable: true,
  get: function () {
    return _slotShouldForwardProp.default;
  }
});
var _createStyled = _interopRequireDefault(require("@mui/system/createStyled"));
var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));
var _identifier = _interopRequireDefault(require("./identifier"));
var _rootShouldForwardProp = _interopRequireDefault(require("./rootShouldForwardProp"));
var _slotShouldForwardProp = _interopRequireDefault(require("./slotShouldForwardProp"));
const styled = (0, _createStyled.default)({
  themeId: _identifier.default,
  defaultTheme: _defaultTheme.default,
  rootShouldForwardProp: _rootShouldForwardProp.default
});
var _default = exports.default = styled;