export interface MenuClasses {
    /** Class name applied to the root element. */
    root: string;
    /** Class name applied to the listbox element. */
    listbox: string;
    /** State class applied to the root element if `open={true}`. */
    expanded: string;
}
export type MenuClassKey = keyof MenuClasses;
export declare function getMenuUtilityClass(slot: string): string;
export declare const menuClasses: MenuClasses;
