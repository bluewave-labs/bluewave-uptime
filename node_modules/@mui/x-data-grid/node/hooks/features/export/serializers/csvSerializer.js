"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildCSV = buildCSV;
exports.serializeCellValue = void 0;
var _colDef = require("../../../../colDef");
var _warning = require("../../../../utils/warning");
function sanitizeCellValue(value, delimiterCharacter, shouldAppendQuotes) {
  if (typeof value === 'string') {
    if (shouldAppendQuotes) {
      const escapedValue = value.replace(/"/g, '""');
      // Make sure value containing delimiter or line break won't be split into multiple rows
      if ([delimiterCharacter, '\n', '\r', '"'].some(delimiter => value.includes(delimiter))) {
        return `"${escapedValue}"`;
      }
      return escapedValue;
    }
    return value;
  }
  return value;
}
const serializeCellValue = (cellParams, options) => {
  const {
    delimiterCharacter,
    ignoreValueFormatter,
    shouldAppendQuotes
  } = options;
  let value;
  if (ignoreValueFormatter) {
    const columnType = cellParams.colDef.type;
    if (columnType === 'number') {
      value = String(cellParams.value);
    } else if (columnType === 'date' || columnType === 'dateTime') {
      value = cellParams.value?.toISOString();
    } else if (typeof cellParams.value?.toString === 'function') {
      value = cellParams.value.toString();
    } else {
      value = cellParams.value;
    }
  } else {
    value = cellParams.formattedValue;
  }
  return sanitizeCellValue(value, delimiterCharacter, shouldAppendQuotes);
};
exports.serializeCellValue = serializeCellValue;
const objectFormattedValueWarning = (0, _warning.buildWarning)(['MUI X: When the value of a field is an object or a `renderCell` is provided, the CSV export might not display the value correctly.', 'You can provide a `valueFormatter` with a string representation to be used.']);
class CSVRow {
  constructor(options) {
    this.options = void 0;
    this.rowString = '';
    this.isEmpty = true;
    this.options = options;
  }
  addValue(value) {
    if (!this.isEmpty) {
      this.rowString += this.options.delimiterCharacter;
    }
    if (value === null || value === undefined) {
      this.rowString += '';
    } else if (typeof this.options.sanitizeCellValue === 'function') {
      this.rowString += this.options.sanitizeCellValue(value, this.options.delimiterCharacter, this.options.shouldAppendQuotes);
    } else {
      this.rowString += value;
    }
    this.isEmpty = false;
  }
  getRowString() {
    return this.rowString;
  }
}
const serializeRow = ({
  id,
  columns,
  getCellParams,
  delimiterCharacter,
  ignoreValueFormatter,
  shouldAppendQuotes
}) => {
  const row = new CSVRow({
    delimiterCharacter,
    shouldAppendQuotes
  });
  columns.forEach(column => {
    const cellParams = getCellParams(id, column.field);
    if (process.env.NODE_ENV !== 'production') {
      if (String(cellParams.formattedValue) === '[object Object]') {
        objectFormattedValueWarning();
      }
    }
    row.addValue(serializeCellValue(cellParams, {
      delimiterCharacter,
      ignoreValueFormatter,
      shouldAppendQuotes
    }));
  });
  return row.getRowString();
};
function buildCSV(options) {
  const {
    columns,
    rowIds,
    delimiterCharacter,
    includeHeaders,
    includeColumnGroupsHeaders,
    ignoreValueFormatter,
    apiRef,
    shouldAppendQuotes
  } = options;
  const CSVBody = rowIds.reduce((acc, id) => `${acc}${serializeRow({
    id,
    columns,
    getCellParams: apiRef.current.getCellParams,
    delimiterCharacter,
    ignoreValueFormatter,
    shouldAppendQuotes
  })}\r\n`, '').trim();
  if (!includeHeaders) {
    return CSVBody;
  }
  const filteredColumns = columns.filter(column => column.field !== _colDef.GRID_CHECKBOX_SELECTION_COL_DEF.field);
  const headerRows = [];
  if (includeColumnGroupsHeaders) {
    const columnGroupLookup = apiRef.current.getAllGroupDetails();
    let maxColumnGroupsDepth = 0;
    const columnGroupPathsLookup = filteredColumns.reduce((acc, column) => {
      const columnGroupPath = apiRef.current.getColumnGroupPath(column.field);
      acc[column.field] = columnGroupPath;
      maxColumnGroupsDepth = Math.max(maxColumnGroupsDepth, columnGroupPath.length);
      return acc;
    }, {});
    for (let i = 0; i < maxColumnGroupsDepth; i += 1) {
      const headerGroupRow = new CSVRow({
        delimiterCharacter,
        sanitizeCellValue,
        shouldAppendQuotes
      });
      headerRows.push(headerGroupRow);
      filteredColumns.forEach(column => {
        const columnGroupId = (columnGroupPathsLookup[column.field] || [])[i];
        const columnGroup = columnGroupLookup[columnGroupId];
        headerGroupRow.addValue(columnGroup ? columnGroup.headerName || columnGroup.groupId : '');
      });
    }
  }
  const mainHeaderRow = new CSVRow({
    delimiterCharacter,
    sanitizeCellValue,
    shouldAppendQuotes
  });
  filteredColumns.forEach(column => {
    mainHeaderRow.addValue(column.headerName || column.field);
  });
  headerRows.push(mainHeaderRow);
  const CSVHead = `${headerRows.map(row => row.getRowString()).join('\r\n')}\r\n`;
  return `${CSVHead}${CSVBody}`.trim();
}