export interface TabPanelClasses {
    /** Class name applied to the root element. */
    root: string;
    /** State class applied to the root `div` element if `hidden={true}`. */
    hidden: string;
}
export type TabPanelClassKey = keyof TabPanelClasses;
export declare function getTabPanelUtilityClass(slot: string): string;
export declare const tabPanelClasses: TabPanelClasses;
