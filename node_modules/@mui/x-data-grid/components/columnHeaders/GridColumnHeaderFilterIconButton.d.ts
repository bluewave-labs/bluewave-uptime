import * as React from 'react';
import { GridColumnHeaderParams } from '../../models/params/gridColumnHeaderParams';
export interface ColumnHeaderFilterIconButtonProps {
    field: string;
    counter?: number;
    onClick?: (params: GridColumnHeaderParams, event: React.MouseEvent<HTMLButtonElement>) => void;
}
declare function GridColumnHeaderFilterIconButton(props: ColumnHeaderFilterIconButtonProps): React.JSX.Element | null;
declare namespace GridColumnHeaderFilterIconButton {
    var propTypes: any;
}
export { GridColumnHeaderFilterIconButton };
