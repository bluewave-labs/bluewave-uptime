import _extends from "@babel/runtime/helpers/esm/extends";
export function isSingleSelectColDef(colDef) {
  return colDef?.type === 'singleSelect';
}
export function getValueOptions(column, additionalParams) {
  if (!column) {
    return undefined;
  }
  return typeof column.valueOptions === 'function' ? column.valueOptions(_extends({
    field: column.field
  }, additionalParams)) : column.valueOptions;
}
export function getValueFromValueOptions(value, valueOptions, getOptionValue) {
  if (valueOptions === undefined) {
    return undefined;
  }
  const result = valueOptions.find(option => {
    const optionValue = getOptionValue(option);
    return String(optionValue) === String(value);
  });
  return getOptionValue(result);
}