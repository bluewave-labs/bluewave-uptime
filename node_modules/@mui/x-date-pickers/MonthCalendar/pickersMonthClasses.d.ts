export interface PickersMonthClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the month button element. */
    monthButton: string;
    /** Styles applied to a disabled month button element. */
    disabled: string;
    /** Styles applied to a selected month button element. */
    selected: string;
}
export type PickersMonthClassKey = keyof PickersMonthClasses;
export declare function getPickersMonthUtilityClass(slot: string): string;
export declare const pickersMonthClasses: Record<keyof PickersMonthClasses, string>;
