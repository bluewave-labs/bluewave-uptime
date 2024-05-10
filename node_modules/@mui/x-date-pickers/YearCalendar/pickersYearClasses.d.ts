export interface PickersYearClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the year button element. */
    yearButton: string;
    /** Styles applied to a selected year button element. */
    selected: string;
    /** Styles applied to a disabled year button element. */
    disabled: string;
}
export type PickersYearClassKey = keyof PickersYearClasses;
export declare function getPickersYearUtilityClass(slot: string): string;
export declare const pickersYearClasses: Record<keyof PickersYearClasses, string>;
