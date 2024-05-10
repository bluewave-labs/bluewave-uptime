import * as React from 'react';
import { OverridableComponent } from '@mui/types';
import { StackTypeMap, StackOwnerState } from './StackProps';
import { Breakpoints } from '../createTheme/createBreakpoints';
import { Spacing } from '../createTheme/createSpacing';
interface StyleFunctionProps {
    theme: {
        breakpoints: Breakpoints;
        spacing: Spacing;
    };
    ownerState: StackOwnerState;
}
declare const defaultCreateStyledComponent: import("@mui/styled-engine").CreateStyledComponent<import("../createStyled").MUIStyledCommonProps<any>, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof React.ClassAttributes<HTMLDivElement> | keyof React.HTMLAttributes<HTMLDivElement>>, {}, any>;
declare function useThemePropsDefault<T extends {}>(props: T): T & {};
export declare const style: ({ ownerState, theme }: StyleFunctionProps) => any;
export default function createStack(options?: {
    createStyledComponent?: typeof defaultCreateStyledComponent;
    useThemeProps?: typeof useThemePropsDefault;
    componentName?: string;
}): OverridableComponent<StackTypeMap<{}, "div">>;
export {};
