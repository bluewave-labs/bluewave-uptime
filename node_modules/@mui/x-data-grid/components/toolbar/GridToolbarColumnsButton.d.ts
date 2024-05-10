import * as React from 'react';
import { ButtonProps } from '@mui/material/Button';
import { TooltipProps } from '@mui/material/Tooltip';
interface GridToolbarColumnsButtonProps {
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps?: {
        button?: Partial<ButtonProps>;
        tooltip?: Partial<TooltipProps>;
    };
}
declare const GridToolbarColumnsButton: React.ForwardRefExoticComponent<GridToolbarColumnsButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { GridToolbarColumnsButton };
