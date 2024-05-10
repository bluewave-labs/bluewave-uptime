import _extends from "@babel/runtime/helpers/esm/extends";
import { GRID_STRING_COL_DEF } from './gridStringColDef';
import { renderEditSingleSelectCell } from '../components/cell/GridEditSingleSelectCell';
import { getGridSingleSelectOperators } from './gridSingleSelectOperators';
import { getValueOptions, isSingleSelectColDef } from '../components/panel/filterPanel/filterPanelUtils';
import { isObject } from '../utils/utils';
const isArrayOfObjects = options => {
  return typeof options[0] === 'object';
};
const defaultGetOptionValue = value => {
  return isObject(value) ? value.value : value;
};
const defaultGetOptionLabel = value => {
  return isObject(value) ? value.label : String(value);
};
export const GRID_SINGLE_SELECT_COL_DEF = _extends({}, GRID_STRING_COL_DEF, {
  type: 'singleSelect',
  getOptionLabel: defaultGetOptionLabel,
  getOptionValue: defaultGetOptionValue,
  valueFormatter(value, row, colDef, apiRef) {
    // const { id, field, value, api } = params;
    const rowId = apiRef.current.getRowId(row);
    if (!isSingleSelectColDef(colDef)) {
      return '';
    }
    const valueOptions = getValueOptions(colDef, {
      id: rowId,
      row
    });
    if (value == null) {
      return '';
    }
    if (!valueOptions) {
      return value;
    }
    if (!isArrayOfObjects(valueOptions)) {
      return colDef.getOptionLabel(value);
    }
    const valueOption = valueOptions.find(option => colDef.getOptionValue(option) === value);
    return valueOption ? colDef.getOptionLabel(valueOption) : '';
  },
  renderEditCell: renderEditSingleSelectCell,
  filterOperators: getGridSingleSelectOperators(),
  // @ts-ignore
  pastedValueParser: (value, row, column) => {
    const colDef = column;
    const valueOptions = getValueOptions(colDef) || [];
    const getOptionValue = colDef.getOptionValue;
    const valueOption = valueOptions.find(option => {
      if (getOptionValue(option) === value) {
        return true;
      }
      return false;
    });
    if (valueOption) {
      return value;
    }
    // do not paste the value if it is not in the valueOptions
    return undefined;
  }
});