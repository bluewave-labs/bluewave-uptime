export interface MenuButtonClasses {
    /** Class name applied to the root element. */
    root: string;
    /** State class applied to the root element if `active={true}`. */
    active: string;
    /** State class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** State class applied to the root element if the associated menu is open. */
    expanded: string;
}
export type MenuButtonClassKey = keyof MenuButtonClasses;
export declare function getMenuButtonUtilityClass(slot: string): string;
export declare const menuButtonClasses: MenuButtonClasses;
