export interface OptionClasses {
    /** Class name applied to the root element. */
    root: string;
    /** State class applied to the root `li` element if `disabled={true}`. */
    disabled: string;
    /** State class applied to the root `li` element if `selected={true}`. */
    selected: string;
    /** State class applied to the root `li` element if `highlighted={true}`. */
    highlighted: string;
}
export type OptionClassKey = keyof OptionClasses;
export declare function getOptionUtilityClass(slot: string): string;
export declare const optionClasses: OptionClasses;
