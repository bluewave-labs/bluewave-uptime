export type Mode = 'light' | 'dark' | 'system';
export type SystemMode = Exclude<Mode, 'system'>;
export interface State<SupportedColorScheme extends string> {
    /**
     * User selected mode.
     * Note: on the server, mode is always undefined
     */
    mode: Mode | undefined;
    /**
     * Only valid if `mode: 'system'`, either 'light' | 'dark'.
     */
    systemMode: SystemMode | undefined;
    /**
     * The color scheme for the light mode.
     */
    lightColorScheme: SupportedColorScheme;
    /**
     * The color scheme for the dark mode.
     */
    darkColorScheme: SupportedColorScheme;
}
export type Result<SupportedColorScheme extends string> = State<SupportedColorScheme> & {
    /**
     * The current application color scheme. It is always `undefined` on the server.
     */
    colorScheme: SupportedColorScheme | undefined;
    /**
     * `mode` is saved to internal state and localStorage
     * If `mode` is null, it will be reset to the defaultMode
     */
    setMode: (mode: Mode | null) => void;
    /**
     * `colorScheme` is saved to internal state and localStorage
     * If `colorScheme` is null, it will be reset to the defaultColorScheme (light | dark)
     */
    setColorScheme: (colorScheme: SupportedColorScheme | Partial<{
        light: SupportedColorScheme | null;
        dark: SupportedColorScheme | null;
    }> | null) => void;
};
export declare function getSystemMode(mode: undefined | string): SystemMode | undefined;
export declare function getColorScheme<SupportedColorScheme extends string>(state: State<SupportedColorScheme>): SupportedColorScheme | undefined;
interface UseCurrentColoSchemeOptions<SupportedColorScheme extends string> {
    defaultLightColorScheme: SupportedColorScheme;
    defaultDarkColorScheme: SupportedColorScheme;
    supportedColorSchemes: Array<SupportedColorScheme>;
    defaultMode?: Mode;
    modeStorageKey?: string;
    colorSchemeStorageKey?: string;
    storageWindow?: Window | null;
}
export default function useCurrentColorScheme<SupportedColorScheme extends string>(options: UseCurrentColoSchemeOptions<SupportedColorScheme>): Result<SupportedColorScheme>;
export {};
