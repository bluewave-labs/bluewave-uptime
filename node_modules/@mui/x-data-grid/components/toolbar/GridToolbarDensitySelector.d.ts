import * as React from 'react';
import { ButtonProps } from '@mui/material/Button';
import { TooltipProps } from '@mui/material/Tooltip';
interface GridToolbarDensitySelectorProps {
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps?: {
        button?: Partial<ButtonProps>;
        tooltip?: Partial<TooltipProps>;
    };
}
declare const GridToolbarDensitySelector: React.ForwardRefExoticComponent<GridToolbarDensitySelectorProps & React.RefAttributes<HTMLButtonElement>>;
export { GridToolbarDensitySelector };
