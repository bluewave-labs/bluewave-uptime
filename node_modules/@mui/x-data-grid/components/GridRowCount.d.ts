import * as React from 'react';
import { SxProps, Theme } from '@mui/system';
interface RowCountProps {
    rowCount: number;
    visibleRowCount: number;
}
export type GridRowCountProps = React.HTMLAttributes<HTMLDivElement> & RowCountProps & {
    sx?: SxProps<Theme>;
};
declare const GridRowCount: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & RowCountProps & {
    sx?: SxProps<Theme> | undefined;
} & React.RefAttributes<HTMLDivElement>>;
export { GridRowCount };
