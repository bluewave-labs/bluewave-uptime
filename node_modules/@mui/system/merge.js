"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _deepmerge = _interopRequireDefault(require("@mui/utils/deepmerge"));
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return (0, _deepmerge.default)(acc, item, {
    clone: false // No need to clone deep, it's way faster.
  });
}
var _default = exports.default = merge;