import _extends from "@babel/runtime/helpers/esm/extends";
import { gridDateComparator } from '../hooks/features/sorting/gridSortingUtils';
import { getGridDateOperators } from './gridDateOperators';
import { GRID_STRING_COL_DEF } from './gridStringColDef';
import { renderEditDateCell } from '../components/cell/GridEditDateCell';
function throwIfNotDateObject({
  value,
  columnType,
  rowId,
  field
}) {
  if (!(value instanceof Date)) {
    throw new Error([`MUI X: \`${columnType}\` column type only accepts \`Date\` objects as values.`, 'Use `valueGetter` to transform the value into a `Date` object.', `Row ID: ${rowId}, field: "${field}".`].join('\n'));
  }
}
export const gridDateFormatter = (value, row, column, apiRef) => {
  if (!value) {
    return '';
  }
  const rowId = apiRef.current.getRowId(row);
  throwIfNotDateObject({
    value,
    columnType: 'date',
    rowId,
    field: column.field
  });
  return value.toLocaleDateString();
};
export const gridDateTimeFormatter = (value, row, column, apiRef) => {
  if (!value) {
    return '';
  }
  const rowId = apiRef.current.getRowId(row);
  throwIfNotDateObject({
    value,
    columnType: 'dateTime',
    rowId,
    field: column.field
  });
  return value.toLocaleString();
};
export const GRID_DATE_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'date',
  sortComparator: gridDateComparator,
  valueFormatter: gridDateFormatter,
  filterOperators: getGridDateOperators(),
  renderEditCell: renderEditDateCell,
  // @ts-ignore
  pastedValueParser: value => new Date(value)
});
export const GRID_DATETIME_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'dateTime',
  sortComparator: gridDateComparator,
  valueFormatter: gridDateTimeFormatter,
  filterOperators: getGridDateOperators(true),
  renderEditCell: renderEditDateCell,
  // @ts-ignore
  pastedValueParser: value => new Date(value)
});