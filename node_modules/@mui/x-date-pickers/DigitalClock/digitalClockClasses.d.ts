export interface DigitalClockClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the list (by default: MenuList) element. */
    list: string;
    /** Styles applied to the list item (by default: MenuItem) element. */
    item: string;
}
export type DigitalClockClassKey = keyof DigitalClockClasses;
export declare function getDigitalClockUtilityClass(slot: string): string;
export declare const digitalClockClasses: DigitalClockClasses;
