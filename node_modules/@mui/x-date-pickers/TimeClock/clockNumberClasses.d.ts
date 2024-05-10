export interface ClockNumberClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to a selected root element. */
    selected: string;
    /** Styles applied to a disabled root element. */
    disabled: string;
}
export type ClockNumberClassKey = keyof ClockNumberClasses;
export declare function getClockNumberUtilityClass(slot: string): string;
export declare const clockNumberClasses: ClockNumberClasses;
