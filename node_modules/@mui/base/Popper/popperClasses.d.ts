export interface PopperClasses {
    /** Class name applied to the root element. */
    root: string;
}
export type PopperClassKey = keyof PopperClasses;
export declare function getPopperUtilityClass(slot: string): string;
export declare const popperClasses: PopperClasses;
