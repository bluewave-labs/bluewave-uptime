import * as React from 'react';
import { Interpolation, MUIStyledComponent as StyledComponent } from '@mui/styled-engine';
import { OverridableComponent } from '@mui/types';
import { ContainerProps, ContainerTypeMap } from './ContainerProps';
import { Theme as DefaultTheme } from '../createTheme';
interface StyleFnProps<Theme> extends ContainerProps {
    theme: Theme;
    ownerState: ContainerProps;
}
type RequiredThemeStructure = Pick<DefaultTheme, 'breakpoints' | 'spacing'>;
export default function createContainer<Theme extends RequiredThemeStructure = DefaultTheme>(options?: {
    createStyledComponent?: (...styles: Array<Interpolation<StyleFnProps<Theme>>>) => StyledComponent<ContainerProps>;
    useThemeProps?: (inProps: ContainerProps) => ContainerProps & {
        component?: React.ElementType;
    };
    componentName?: string;
}): OverridableComponent<ContainerTypeMap<{}, "div">>;
export {};
