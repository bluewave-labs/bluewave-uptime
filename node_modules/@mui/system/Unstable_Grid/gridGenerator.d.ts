import { Breakpoints } from '../createTheme/createBreakpoints';
import { Spacing } from '../createTheme/createSpacing';
import { ResponsiveStyleValue } from '../styleFunctionSx';
import { GridDirection, GridOwnerState } from './GridProps';
interface Props {
    theme: {
        breakpoints: Breakpoints;
        spacing?: Spacing;
    };
    ownerState: GridOwnerState & {
        parentDisableEqualOverflow?: boolean;
    };
}
export declare const generateGridSizeStyles: ({ theme, ownerState }: Props) => {};
export declare const generateGridOffsetStyles: ({ theme, ownerState }: Props) => {};
export declare const generateGridColumnsStyles: ({ theme, ownerState }: Props) => {
    [x: string]: string;
    '--Grid-columns'?: undefined;
} | {
    '--Grid-columns': number;
};
export declare const generateGridRowSpacingStyles: ({ theme, ownerState }: Props) => {
    [x: string]: string;
};
export declare const generateGridColumnSpacingStyles: ({ theme, ownerState }: Props) => {
    [x: string]: string;
};
export declare const generateGridDirectionStyles: ({ theme, ownerState }: Props) => {};
export declare const generateGridStyles: ({ ownerState }: Props) => {};
export declare const generateSizeClassNames: (gridSize: GridOwnerState['gridSize']) => string[];
export declare const generateSpacingClassNames: (spacing: GridOwnerState['spacing'], smallestBreakpoint?: string) => string[];
export declare const generateDirectionClasses: (direction: ResponsiveStyleValue<GridDirection> | undefined) => string[];
export {};
