export interface TabClasses {
    /** Class name applied to the root element. */
    root: string;
    /** State class applied to the root `button` element if `selected={true}`. */
    selected: string;
    /** State class applied to the root `button` element if `disabled={true}`. */
    disabled: string;
}
export type TabClassKey = keyof TabClasses;
export declare function getTabUtilityClass(slot: string): string;
export declare const tabClasses: TabClasses;
