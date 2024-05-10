/// <reference types="react" />
import { Theme } from '@mui/material/styles';
import { DataGridProcessedProps } from '../../models/props/DataGridProps';
export type OwnerState = DataGridProcessedProps;
export declare const GridRootStyles: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<Theme> & {
    ownerState: OwnerState;
}, Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof import("react").ClassAttributes<HTMLDivElement> | keyof import("react").HTMLAttributes<HTMLDivElement>>, {}>;
