import * as React from 'react';
import { Interpolation } from '@mui/styled-engine';
import { Theme as SystemTheme } from '../createTheme';
export interface GlobalStylesProps<Theme = SystemTheme> {
    styles: Interpolation<Theme>;
    defaultTheme?: object;
    themeId?: string;
}
declare function GlobalStyles<Theme = SystemTheme>({ styles, themeId, defaultTheme, }: GlobalStylesProps<Theme>): React.JSX.Element;
declare namespace GlobalStyles {
    var propTypes: any;
}
export default GlobalStyles;
