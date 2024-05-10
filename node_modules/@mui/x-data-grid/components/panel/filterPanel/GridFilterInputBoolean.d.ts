import * as React from 'react';
import { TextFieldProps } from '@mui/material/TextField';
import { GridFilterInputValueProps } from './GridFilterInputValueProps';
export type GridFilterInputBooleanProps = GridFilterInputValueProps & TextFieldProps & {
    clearButton?: React.ReactNode | null;
    /**
     * It is `true` if the filter either has a value or an operator with no value
     * required is selected (for example `isEmpty`)
     */
    isFilterActive?: boolean;
};
declare function GridFilterInputBoolean(props: GridFilterInputBooleanProps): React.JSX.Element;
declare namespace GridFilterInputBoolean {
    var propTypes: any;
}
export { GridFilterInputBoolean };
