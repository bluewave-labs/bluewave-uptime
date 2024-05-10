export interface TabsListClasses {
    /** Class name applied to the root element. */
    root: string;
    /** Class name applied to the root element if `orientation='horizontal'`. */
    horizontal: string;
    /** Class name applied to the root element if `orientation='vertical'`. */
    vertical: string;
}
export type TabsListClassKey = keyof TabsListClasses;
export declare function getTabsListUtilityClass(slot: string): string;
export declare const tabsListClasses: TabsListClasses;
