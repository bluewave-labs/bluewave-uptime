export interface DefaultCssVarsTheme {
    colorSchemes?: Record<string, any>;
    defaultColorScheme?: string;
}
declare function prepareCssVars<T extends DefaultCssVarsTheme, ThemeVars extends Record<string, any>, Selector = any>(theme: T, parserConfig?: {
    prefix?: string;
    shouldSkipGeneratingVar?: (objectPathKeys: Array<string>, value: string | number) => boolean;
    getSelector?: (colorScheme: string | undefined, css: Record<string, any>) => Selector;
}): {
    vars: ThemeVars;
    generateCssVars: (colorScheme?: string) => {
        css: {
            [x: string]: string | number;
        };
        vars: ThemeVars;
        selector: string | NonNullable<Selector>;
    };
};
export default prepareCssVars;
