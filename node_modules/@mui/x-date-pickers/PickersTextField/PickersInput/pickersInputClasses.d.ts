import { PickersInputBaseClasses } from '../PickersInputBase';
export interface PickersInputClasses extends PickersInputBaseClasses {
    /** Styles applied to the root element unless `disableUnderline={true}`. */
    underline: string;
}
export type PickersInputClassKey = keyof PickersInputClasses;
export declare function getPickersInputUtilityClass(slot: string): string;
export declare const pickersInputClasses: {
    disabled: string;
    input: string;
    readOnly: string;
    error: string;
    focused: string;
    root: string;
    adornedStart: string;
    adornedEnd: string;
    notchedOutline: string;
    sectionsContainer: string;
    sectionContent: string;
    sectionBefore: string;
    sectionAfter: string;
};
