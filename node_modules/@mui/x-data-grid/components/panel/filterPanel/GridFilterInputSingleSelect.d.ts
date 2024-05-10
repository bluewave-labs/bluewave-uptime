import * as React from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { GridFilterInputValueProps } from './GridFilterInputValueProps';
export type GridFilterInputSingleSelectProps = GridFilterInputValueProps & TextFieldProps & {
    clearButton?: React.ReactNode | null;
    /**
     * It is `true` if the filter either has a value or an operator with no value
     * required is selected (for example `isEmpty`)
     */
    isFilterActive?: boolean;
    type?: 'singleSelect';
};
declare function GridFilterInputSingleSelect(props: GridFilterInputSingleSelectProps): React.JSX.Element | null;
declare namespace GridFilterInputSingleSelect {
    var propTypes: any;
}
export { GridFilterInputSingleSelect };
