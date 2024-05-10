import { DefaultCssVarsTheme } from './prepareCssVars';
interface Theme extends DefaultCssVarsTheme {
    cssVarPrefix?: string;
    shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
}
declare function createCssVarsTheme<T extends Theme, ThemeVars extends Record<string, any>>(theme: T): T & {
    vars: ThemeVars;
    generateCssVars: (colorScheme?: string | undefined) => {
        css: {
            [x: string]: string | number;
        };
        vars: ThemeVars;
        selector: any;
    };
};
export default createCssVarsTheme;
