import { gridColumnDefinitionsSelector, gridVisibleColumnDefinitionsSelector } from '../columns';
import { gridFilteredSortedRowIdsSelector } from '../filter';
import { gridPinnedRowsSelector, gridRowTreeSelector } from '../rows/gridRowsSelector';
export const getColumnsToExport = ({
  apiRef,
  options
}) => {
  const columns = gridColumnDefinitionsSelector(apiRef);
  if (options.fields) {
    return options.fields.reduce((currentColumns, field) => {
      const column = columns.find(col => col.field === field);
      if (column) {
        currentColumns.push(column);
      }
      return currentColumns;
    }, []);
  }
  const validColumns = options.allColumns ? columns : gridVisibleColumnDefinitionsSelector(apiRef);
  return validColumns.filter(column => !column.disableExport);
};
export const defaultGetRowsToExport = ({
  apiRef
}) => {
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const rowTree = gridRowTreeSelector(apiRef);
  const selectedRows = apiRef.current.getSelectedRows();
  const bodyRows = filteredSortedRowIds.filter(id => rowTree[id].type !== 'footer');
  const pinnedRows = gridPinnedRowsSelector(apiRef);
  const topPinnedRowsIds = pinnedRows?.top?.map(row => row.id) || [];
  const bottomPinnedRowsIds = pinnedRows?.bottom?.map(row => row.id) || [];
  bodyRows.unshift(...topPinnedRowsIds);
  bodyRows.push(...bottomPinnedRowsIds);
  if (selectedRows.size > 0) {
    return bodyRows.filter(id => selectedRows.has(id));
  }
  return bodyRows;
};