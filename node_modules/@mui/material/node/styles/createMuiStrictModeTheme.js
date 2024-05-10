"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMuiStrictModeTheme;
var _deepmerge = _interopRequireDefault(require("@mui/utils/deepmerge"));
var _createTheme = _interopRequireDefault(require("./createTheme"));
function createMuiStrictModeTheme(options, ...args) {
  return (0, _createTheme.default)((0, _deepmerge.default)({
    unstable_strictMode: true
  }, options), ...args);
}