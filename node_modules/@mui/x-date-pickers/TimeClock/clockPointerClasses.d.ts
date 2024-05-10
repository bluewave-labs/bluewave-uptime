export interface ClockPointerClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the thumb element. */
    thumb: string;
}
export type ClockPointerClassKey = keyof ClockPointerClasses;
export declare function getClockPointerUtilityClass(slot: string): string;
export declare const clockPointerClasses: ClockPointerClasses;
