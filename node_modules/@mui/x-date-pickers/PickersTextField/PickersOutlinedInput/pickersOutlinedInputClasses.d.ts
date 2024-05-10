import { PickersInputBaseClasses } from '../PickersInputBase';
export interface PickersOutlinedInputClasses extends PickersInputBaseClasses {
    /** Styles applied to the NotchedOutline element. */
    notchedOutline: string;
}
export type PickersOutlinedInputClassKey = keyof PickersOutlinedInputClasses;
export declare function getPickersOutlinedInputUtilityClass(slot: string): string;
export declare const pickersOutlinedInputClasses: {
    input: string;
    root: string;
    notchedOutline: string;
    disabled: string;
    readOnly: string;
    error: string;
    focused: string;
    adornedStart: string;
    adornedEnd: string;
    sectionsContainer: string;
    sectionContent: string;
    sectionBefore: string;
    sectionAfter: string;
};
