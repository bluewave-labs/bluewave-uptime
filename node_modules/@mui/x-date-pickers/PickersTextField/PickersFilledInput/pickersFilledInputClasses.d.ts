import { PickersInputBaseClasses } from '../PickersInputBase';
export interface PickersFilledInputClasses extends PickersInputBaseClasses {
    /** Styles applied to the root element unless `disableUnderline={true}`. */
    underline?: string;
}
export type PickersFilledInputClassKey = keyof PickersFilledInputClasses;
export declare function getPickersFilledInputUtilityClass(slot: string): string;
export declare const pickersFilledInputClasses: {
    underline: string;
    input: string;
    root: string;
    disabled: string;
    readOnly: string;
    error: string;
    focused: string;
    adornedStart: string;
    adornedEnd: string;
    notchedOutline: string;
    sectionsContainer: string;
    sectionContent: string;
    sectionBefore: string;
    sectionAfter: string;
};
