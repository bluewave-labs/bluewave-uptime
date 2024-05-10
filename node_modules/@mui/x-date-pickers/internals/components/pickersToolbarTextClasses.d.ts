export interface PickersToolbarTextClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to a selected root element. */
    selected: string;
}
export type PickersToolbarTextClassKey = keyof PickersToolbarTextClasses;
export declare function getPickersToolbarTextUtilityClass(slot: string): string;
export declare const pickersToolbarTextClasses: Record<"selected" | "root", string>;
