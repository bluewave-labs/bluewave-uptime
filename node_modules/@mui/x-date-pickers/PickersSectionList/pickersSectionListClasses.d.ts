export interface PickersSectionListClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the container of a section. */
    section: string;
    /** Styles applied to the content of a section. */
    sectionContent: string;
}
export type PickersSectionListClassKey = keyof PickersSectionListClasses;
export declare function getPickersSectionListUtilityClass(slot: string): string;
export declare const pickersSectionListClasses: Record<keyof PickersSectionListClasses, string>;
