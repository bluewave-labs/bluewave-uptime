import * as React from 'react';
import { GridRenderEditCellParams } from '../../models/params/gridCellParams';
export interface GridEditBooleanCellProps extends GridRenderEditCellParams, Omit<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, 'id' | 'tabIndex'> {
    /**
     * Callback called when the value is changed by the user.
     * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
     * @param {boolean} newValue The value that is going to be passed to `apiRef.current.setEditCellValue`.
     * @returns {Promise<void> | void} A promise to be awaited before calling `apiRef.current.setEditCellValue`
     */
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>, newValue: boolean) => Promise<void> | void;
}
declare function GridEditBooleanCell(props: GridEditBooleanCellProps): React.JSX.Element;
declare namespace GridEditBooleanCell {
    var propTypes: any;
}
export { GridEditBooleanCell };
export declare const renderEditBooleanCell: (params: GridEditBooleanCellProps) => React.JSX.Element;
