import * as React from 'react';
export declare const DEFAULT_MODE_STORAGE_KEY = "mode";
export declare const DEFAULT_COLOR_SCHEME_STORAGE_KEY = "color-scheme";
export declare const DEFAULT_ATTRIBUTE = "data-color-scheme";
export interface GetInitColorSchemeScriptOptions {
    /**
     * The mode to be used for the first visit
     * @default 'light'
     */
    defaultMode?: 'light' | 'dark' | 'system';
    /**
     * The default color scheme to be used on the light mode
     * @default 'light'
     */
    defaultLightColorScheme?: string;
    /**
     * The default color scheme to be used on the dark mode
     * * @default 'dark'
     */
    defaultDarkColorScheme?: string;
    /**
     * The node (provided as string) used to attach the color-scheme attribute
     * @default 'document.documentElement'
     */
    colorSchemeNode?: string;
    /**
     * localStorage key used to store `mode`
     * @default 'mode'
     */
    modeStorageKey?: string;
    /**
     * localStorage key used to store `colorScheme`
     * @default 'color-scheme'
     */
    colorSchemeStorageKey?: string;
    /**
     * DOM attribute for applying color scheme
     * @default 'data-color-scheme'
     */
    attribute?: string;
}
export default function getInitColorSchemeScript(options?: GetInitColorSchemeScriptOptions): React.JSX.Element;
