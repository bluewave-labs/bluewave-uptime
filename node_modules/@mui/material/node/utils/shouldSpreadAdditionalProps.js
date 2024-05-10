"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("@mui/base/utils");
const shouldSpreadAdditionalProps = Slot => {
  return !Slot || !(0, _utils.isHostComponent)(Slot);
};
var _default = exports.default = shouldSpreadAdditionalProps;