export interface ClockClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the clock element. */
    clock: string;
    /** Styles applied to the wrapper element. */
    wrapper: string;
    /** Styles applied to the square mask element. */
    squareMask: string;
    /** Styles applied to the pin element. */
    pin: string;
    /** Styles applied to the am button element. */
    amButton: string;
    /** Styles applied to the pm button element. */
    pmButton: string;
    /** Styles applied to the meridiem typography element. */
    meridiemText: string;
}
export type ClockClassKey = keyof ClockClasses;
export declare function getClockUtilityClass(slot: string): string;
export declare const clockClasses: ClockClasses;
