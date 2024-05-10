import * as React from 'react';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { GridFilterInputValueProps } from './GridFilterInputValueProps';
export type GridFilterInputMultipleValueProps = {
    type?: 'text' | 'number';
} & GridFilterInputValueProps & Omit<AutocompleteProps<string, true, false, true>, 'options' | 'renderInput'>;
declare function GridFilterInputMultipleValue(props: GridFilterInputMultipleValueProps): React.JSX.Element;
declare namespace GridFilterInputMultipleValue {
    var propTypes: any;
}
export { GridFilterInputMultipleValue };
