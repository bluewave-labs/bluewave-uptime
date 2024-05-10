import * as React from 'react';
import { Theme, SxProps } from '@mui/system';
export type GridOverlayProps = React.HTMLAttributes<HTMLDivElement> & {
    sx?: SxProps<Theme>;
};
declare const GridOverlay: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    sx?: SxProps<Theme> | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { GridOverlay };
