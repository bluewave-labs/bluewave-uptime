"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridCsvExport = void 0;
var React = _interopRequireWildcard(require("react"));
var _useGridApiMethod = require("../../utils/useGridApiMethod");
var _useGridLogger = require("../../utils/useGridLogger");
var _exportAs = require("../../../utils/exportAs");
var _csvSerializer = require("./serializers/csvSerializer");
var _utils = require("./utils");
var _pipeProcessing = require("../../core/pipeProcessing");
var _GridToolbarExport = require("../../../components/toolbar/GridToolbarExport");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @requires useGridColumns (state)
 * @requires useGridFilter (state)
 * @requires useGridSorting (state)
 * @requires useGridSelection (state)
 * @requires useGridParamsApi (method)
 */
const useGridCsvExport = (apiRef, props) => {
  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridCsvExport');
  const ignoreValueFormatterProp = props.ignoreValueFormatterDuringExport;
  const ignoreValueFormatter = (typeof ignoreValueFormatterProp === 'object' ? ignoreValueFormatterProp?.csvExport : ignoreValueFormatterProp) || false;
  const getDataAsCsv = React.useCallback((options = {}) => {
    logger.debug(`Get data as CSV`);
    const exportedColumns = (0, _utils.getColumnsToExport)({
      apiRef,
      options
    });
    const getRowsToExport = options.getRowsToExport ?? _utils.defaultGetRowsToExport;
    const exportedRowIds = getRowsToExport({
      apiRef
    });
    return (0, _csvSerializer.buildCSV)({
      columns: exportedColumns,
      rowIds: exportedRowIds,
      delimiterCharacter: options.delimiter || ',',
      includeHeaders: options.includeHeaders ?? true,
      includeColumnGroupsHeaders: options.includeColumnGroupsHeaders ?? true,
      ignoreValueFormatter,
      apiRef,
      shouldAppendQuotes: options.shouldAppendQuotes ?? true
    });
  }, [logger, apiRef, ignoreValueFormatter]);
  const exportDataAsCsv = React.useCallback(options => {
    logger.debug(`Export data as CSV`);
    const csv = getDataAsCsv(options);
    const blob = new Blob([options?.utf8WithBom ? new Uint8Array([0xef, 0xbb, 0xbf]) : '', csv], {
      type: 'text/csv'
    });
    (0, _exportAs.exportAs)(blob, 'csv', options?.fileName);
  }, [logger, getDataAsCsv]);
  const csvExportApi = {
    getDataAsCsv,
    exportDataAsCsv
  };
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, csvExportApi, 'public');

  /**
   * PRE-PROCESSING
   */
  const addExportMenuButtons = React.useCallback((initialValue, options) => {
    if (options.csvOptions?.disableToolbarButton) {
      return initialValue;
    }
    return [...initialValue, {
      component: /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridToolbarExport.GridCsvExportMenuItem, {
        options: options.csvOptions
      }),
      componentName: 'csvExport'
    }];
  }, []);
  (0, _pipeProcessing.useGridRegisterPipeProcessor)(apiRef, 'exportMenu', addExportMenuButtons);
};
exports.useGridCsvExport = useGridCsvExport;