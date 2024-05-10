/**
 * @deprecated Not used internally. Use `MediaQueryListEvent` from lib.dom.d.ts instead.
 */
export interface MuiMediaQueryListEvent {
    matches: boolean;
}
/**
 * @deprecated Not used internally. Use `MediaQueryList` from lib.dom.d.ts instead.
 */
export interface MuiMediaQueryList {
    matches: boolean;
    addListener: (listener: MuiMediaQueryListListener) => void;
    removeListener: (listener: MuiMediaQueryListListener) => void;
}
/**
 * @deprecated Not used internally. Use `(event: MediaQueryListEvent) => void` instead.
 */
export type MuiMediaQueryListListener = (event: MuiMediaQueryListEvent) => void;
export interface UseMediaQueryOptions {
    /**
     * As `window.matchMedia()` is unavailable on the server,
     * it returns a default matches during the first mount.
     * @default false
     */
    defaultMatches?: boolean;
    /**
     * You can provide your own implementation of matchMedia.
     * This can be used for handling an iframe content window.
     */
    matchMedia?: typeof window.matchMedia;
    /**
     * To perform the server-side hydration, the hook needs to render twice.
     * A first time with `defaultMatches`, the value of the server, and a second time with the resolved value.
     * This double pass rendering cycle comes with a drawback: it's slower.
     * You can set this option to `true` if you use the returned value **only** client-side.
     * @default false
     */
    noSsr?: boolean;
    /**
     * You can provide your own implementation of `matchMedia`, it's used when rendering server-side.
     */
    ssrMatchMedia?: (query: string) => {
        matches: boolean;
    };
}
export default function useMediaQuery<Theme = unknown>(queryInput: string | ((theme: Theme) => string), options?: UseMediaQueryOptions): boolean;
