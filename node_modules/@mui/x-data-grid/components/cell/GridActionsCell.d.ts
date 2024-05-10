import * as React from 'react';
import { GridRenderCellParams } from '../../models/params/gridCellParams';
import { GridMenuProps } from '../menu/GridMenu';
interface GridActionsCellProps extends Omit<GridRenderCellParams, 'api'> {
    api?: GridRenderCellParams['api'];
    position?: GridMenuProps['position'];
}
declare function GridActionsCell(props: GridActionsCellProps): React.JSX.Element;
declare namespace GridActionsCell {
    var propTypes: any;
}
export { GridActionsCell };
export declare const renderActionsCell: (params: GridRenderCellParams) => React.JSX.Element;
