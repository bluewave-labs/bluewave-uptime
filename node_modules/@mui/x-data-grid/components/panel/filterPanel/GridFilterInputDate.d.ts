import * as React from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { GridFilterInputValueProps } from './GridFilterInputValueProps';
export type GridFilterInputDateProps = GridFilterInputValueProps & TextFieldProps & {
    type?: 'date' | 'datetime-local';
    clearButton?: React.ReactNode | null;
    /**
     * It is `true` if the filter either has a value or an operator with no value
     * required is selected (for example `isEmpty`)
     */
    isFilterActive?: boolean;
};
declare function GridFilterInputDate(props: GridFilterInputDateProps): React.JSX.Element;
declare namespace GridFilterInputDate {
    var propTypes: any;
}
export { GridFilterInputDate };
