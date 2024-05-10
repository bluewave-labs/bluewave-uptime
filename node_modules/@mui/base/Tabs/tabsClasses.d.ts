export interface TabsClasses {
    /** Class name applied to the root element. */
    root: string;
    /** Class name applied to the root element if `orientation='horizontal'`. */
    horizontal: string;
    /** Class name applied to the root element if `orientation='vertical'`. */
    vertical: string;
}
export type TabsClassKey = keyof TabsClasses;
export declare function getTabsUtilityClass(slot: string): string;
export declare const tabsClasses: TabsClasses;
