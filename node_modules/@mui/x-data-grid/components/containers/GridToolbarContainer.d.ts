import * as React from 'react';
import { SxProps, Theme } from '@mui/system';
export type GridToolbarContainerProps = React.HTMLAttributes<HTMLDivElement> & {
    sx?: SxProps<Theme>;
};
declare const GridToolbarContainer: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    sx?: SxProps<Theme> | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { GridToolbarContainer };
