export interface PickersToolbarButtonClasses {
    /** Styles applied to the root element. */
    root: string;
}
export type PickersToolbarButtonClassKey = keyof PickersToolbarButtonClasses;
export declare function getPickersToolbarButtonUtilityClass(slot: string): string;
export declare const pickersToolbarButtonClasses: Record<"root", string>;
