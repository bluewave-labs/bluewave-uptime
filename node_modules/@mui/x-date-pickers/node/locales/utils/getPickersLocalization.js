"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPickersLocalization = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
const getPickersLocalization = pickersTranslations => {
  return {
    components: {
      MuiLocalizationProvider: {
        defaultProps: {
          localeText: (0, _extends2.default)({}, pickersTranslations)
        }
      }
    }
  };
};
exports.getPickersLocalization = getPickersLocalization;