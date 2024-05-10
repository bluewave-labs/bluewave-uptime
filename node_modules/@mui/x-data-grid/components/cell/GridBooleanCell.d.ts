import * as React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { GridRenderCellParams } from '../../models/params/gridCellParams';
import { GridColDef } from '../../models/colDef/gridColDef';
interface GridBooleanCellProps extends GridRenderCellParams, Omit<SvgIconProps, 'tabIndex' | 'id'> {
    hideDescendantCount?: boolean;
}
declare function GridBooleanCellRaw(props: GridBooleanCellProps): React.JSX.Element;
declare namespace GridBooleanCellRaw {
    var propTypes: any;
}
declare const GridBooleanCell: React.MemoExoticComponent<typeof GridBooleanCellRaw>;
export { GridBooleanCell };
export declare const renderBooleanCell: GridColDef['renderCell'];
