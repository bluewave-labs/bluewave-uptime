export interface GridColumnTypes {
    string: 'string';
    number: 'number';
    date: 'date';
    dateTime: 'dateTime';
    boolean: 'boolean';
    singleSelect: 'singleSelect';
    actions: 'actions';
    custom: 'custom';
}
export type GridColType = GridColumnTypes[keyof GridColumnTypes];
