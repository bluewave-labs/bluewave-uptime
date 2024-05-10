import * as React from 'react';
import { InputBaseProps } from '@mui/material/InputBase';
import { GridRenderEditCellParams } from '../../models/params/gridCellParams';
export interface GridEditInputCellProps extends GridRenderEditCellParams, Omit<InputBaseProps, 'id' | 'value' | 'tabIndex' | 'ref'> {
    debounceMs?: number;
    /**
     * Callback called when the value is changed by the user.
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * @param {Date | null} newValue The value that is going to be passed to `apiRef.current.setEditCellValue`.
     * @returns {Promise<void> | void} A promise to be awaited before calling `apiRef.current.setEditCellValue`
     */
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => Promise<void> | void;
}
declare const GridEditInputCell: React.ForwardRefExoticComponent<Omit<GridEditInputCellProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { GridEditInputCell };
export declare const renderEditInputCell: (params: GridEditInputCellProps) => React.JSX.Element;
