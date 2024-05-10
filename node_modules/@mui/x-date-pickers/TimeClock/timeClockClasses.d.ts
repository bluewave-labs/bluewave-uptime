export interface TimeClockClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the arrowSwitcher element. */
    arrowSwitcher: string;
}
export type TimeClockClassKey = keyof TimeClockClasses;
export declare function getTimeClockUtilityClass(slot: string): string;
export declare const timeClockClasses: TimeClockClasses;
