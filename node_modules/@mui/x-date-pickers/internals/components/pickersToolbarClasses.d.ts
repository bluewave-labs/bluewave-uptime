export interface PickersToolbarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the content element. */
    content: string;
}
export type PickersToolbarClassKey = keyof PickersToolbarClasses;
export declare function getPickersToolbarUtilityClass(slot: string): string;
export declare const pickersToolbarClasses: Record<"content" | "root", string>;
