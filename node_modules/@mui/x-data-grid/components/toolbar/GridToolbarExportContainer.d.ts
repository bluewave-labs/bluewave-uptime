import * as React from 'react';
import { ButtonProps } from '@mui/material/Button';
import { TooltipProps } from '@mui/material/Tooltip';
interface GridToolbarExportContainerProps {
    /**
     * The props used for each slot inside.
     * @default {}
     */
    slotProps?: {
        button?: Partial<ButtonProps>;
        tooltip?: Partial<TooltipProps>;
    };
}
declare const GridToolbarExportContainer: React.ForwardRefExoticComponent<GridToolbarExportContainerProps & {
    children?: React.ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;
export { GridToolbarExportContainer };
