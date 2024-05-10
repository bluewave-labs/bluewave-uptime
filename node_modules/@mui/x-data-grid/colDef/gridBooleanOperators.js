import { GridFilterInputBoolean } from '../components/panel/filterPanel/GridFilterInputBoolean';
export const getGridBooleanOperators = () => [{
  value: 'is',
  getApplyFilterFn: filterItem => {
    if (!filterItem.value) {
      return null;
    }
    const valueAsBoolean = String(filterItem.value) === 'true';
    return value => {
      return Boolean(value) === valueAsBoolean;
    };
  },
  InputComponent: GridFilterInputBoolean
}];