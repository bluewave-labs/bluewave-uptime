import * as React from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { GridFilterInputValueProps } from './GridFilterInputValueProps';
export type GridTypeFilterInputValueProps = GridFilterInputValueProps & TextFieldProps & {
    type?: 'text' | 'number' | 'date' | 'datetime-local';
    clearButton?: React.ReactNode | null;
    /**
     * It is `true` if the filter either has a value or an operator with no value
     * required is selected (for example `isEmpty`)
     */
    isFilterActive?: boolean;
};
declare function GridFilterInputValue(props: GridTypeFilterInputValueProps): React.JSX.Element;
declare namespace GridFilterInputValue {
    var propTypes: any;
}
export { GridFilterInputValue };
