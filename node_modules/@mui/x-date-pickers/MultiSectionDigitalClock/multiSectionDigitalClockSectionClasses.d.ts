export interface MultiSectionDigitalClockSectionClasses {
    /** Styles applied to the root (list) element. */
    root: string;
    /** Styles applied to the list item (by default: MenuItem) element. */
    item: string;
}
export type MultiSectionDigitalClockSectionClassKey = keyof MultiSectionDigitalClockSectionClasses;
export declare function getMultiSectionDigitalClockSectionUtilityClass(slot: string): string;
export declare const multiSectionDigitalClockSectionClasses: MultiSectionDigitalClockSectionClasses;
