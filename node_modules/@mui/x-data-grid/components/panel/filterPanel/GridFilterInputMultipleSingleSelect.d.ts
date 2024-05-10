import * as React from 'react';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { GridFilterInputValueProps } from './GridFilterInputValueProps';
import type { ValueOptions } from '../../../models/colDef/gridColDef';
export interface GridFilterInputMultipleSingleSelectProps extends Omit<AutocompleteProps<ValueOptions, true, false, true>, 'options' | 'renderInput' | 'onChange' | 'value' | 'id' | 'filterOptions' | 'isOptionEqualToValue' | 'multiple' | 'color' | 'getOptionLabel'>, GridFilterInputValueProps {
    type?: 'singleSelect';
}
declare function GridFilterInputMultipleSingleSelect(props: GridFilterInputMultipleSingleSelectProps): React.JSX.Element;
declare namespace GridFilterInputMultipleSingleSelect {
    var propTypes: any;
}
export { GridFilterInputMultipleSingleSelect };
