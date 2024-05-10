import * as React from 'react';
import { InputBaseProps } from '@mui/material/InputBase';
import { GridRenderEditCellParams } from '../../models/params/gridCellParams';
export interface GridEditDateCellProps extends GridRenderEditCellParams, Omit<InputBaseProps, 'id' | 'value' | 'tabIndex'> {
    /**
     * Callback called when the value is changed by the user.
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * @param {Date | null} newValue The value that is going to be passed to `apiRef.current.setEditCellValue`.
     * @returns {Promise<void> | void} A promise to be awaited before calling `apiRef.current.setEditCellValue`
     */
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>, newValue: Date | null) => Promise<void> | void;
}
declare function GridEditDateCell(props: GridEditDateCellProps): React.JSX.Element;
declare namespace GridEditDateCell {
    var propTypes: any;
}
export { GridEditDateCell };
export declare const renderEditDateCell: (params: GridRenderEditCellParams) => React.JSX.Element;
