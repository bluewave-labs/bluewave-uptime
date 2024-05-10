import * as React from 'react';
import { ButtonProps } from '@mui/material/Button';
import { TooltipProps } from '@mui/material/Tooltip';
export interface GridToolbarFilterButtonProps {
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps?: {
        button?: Partial<ButtonProps>;
        tooltip?: Partial<TooltipProps>;
    };
}
declare const GridToolbarFilterButton: React.ForwardRefExoticComponent<GridToolbarFilterButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { GridToolbarFilterButton };
