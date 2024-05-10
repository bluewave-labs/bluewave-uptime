import * as React from 'react';
import { GridColumnMenuRootProps } from './columnMenuInterfaces';
import { GridColDef } from '../../../models/colDef/gridColDef';
interface UseGridColumnMenuSlotsProps extends GridColumnMenuRootProps {
    colDef: GridColDef;
    hideMenu: (event: React.SyntheticEvent) => void;
    addDividers?: boolean;
}
type UseGridColumnMenuSlotsResponse = Array<[
    React.JSXElementConstructor<any>,
    {
        [key: string]: any;
    }
]>;
declare const useGridColumnMenuSlots: (props: UseGridColumnMenuSlotsProps) => UseGridColumnMenuSlotsResponse;
export { useGridColumnMenuSlots };
