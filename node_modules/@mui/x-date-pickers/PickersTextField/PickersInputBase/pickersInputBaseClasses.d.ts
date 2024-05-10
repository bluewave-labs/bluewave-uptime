export interface PickersInputBaseClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if focused. */
    focused: string;
    /** State class applied to the root element if `disabled=true`. */
    disabled: string;
    /** State class applied to the root element if `readOnly=true`. */
    readOnly: string;
    /** State class applied to the root element if `error=true`. */
    error: string;
    /** Styles applied to the NotchedOutline element. */
    notchedOutline: string;
    /** Styles applied to the real hidden input element. */
    input: string;
    /** Styles applied to the container of the sections. */
    sectionsContainer: string;
    /** Styles applied to the content of a section. */
    sectionContent: string;
    /** Styles applied to the separator before a section */
    sectionBefore: string;
    /** Styles applied to the separator after a section */
    sectionAfter: string;
    /** Styles applied to the root if there is a startAdornment present */
    adornedStart: string;
    /** Styles applied to the root if there is an endAdornment present */
    adornedEnd: string;
}
export type PickersInputBaseClassKey = keyof PickersInputBaseClasses;
export declare function getPickersInputBaseUtilityClass(slot: string): string;
export declare const pickersInputBaseClasses: Record<keyof PickersInputBaseClasses, string>;
