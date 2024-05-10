import * as React from 'react';
import { TrapFocusProps } from '@mui/material/Unstable_TrapFocus';
import { Theme } from '@mui/material/styles';
import { MUIStyledCommonProps } from '@mui/system';
export interface GridPanelWrapperProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>, MUIStyledCommonProps<Theme> {
    slotProps?: {
        TrapFocus?: TrapFocusProps;
    };
}
declare const GridPanelWrapper: React.ForwardRefExoticComponent<GridPanelWrapperProps & React.RefAttributes<HTMLDivElement>>;
export { GridPanelWrapper };
