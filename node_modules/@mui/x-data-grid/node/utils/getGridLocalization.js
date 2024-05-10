"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGridLocalization = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
const getGridLocalization = (gridTranslations, coreTranslations) => ({
  components: {
    MuiDataGrid: {
      defaultProps: {
        localeText: (0, _extends2.default)({}, gridTranslations, {
          MuiTablePagination: coreTranslations?.components?.MuiTablePagination?.defaultProps || {}
        })
      }
    }
  }
});
exports.getGridLocalization = getGridLocalization;