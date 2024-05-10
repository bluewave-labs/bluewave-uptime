export interface PickersPopperClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the paper element. */
    paper: string;
}
export type PickersPopperClassKey = keyof PickersPopperClasses;
export declare function getPickersPopperUtilityClass(slot: string): string;
export declare const pickersPopperClasses: Record<"root" | "paper", string>;
