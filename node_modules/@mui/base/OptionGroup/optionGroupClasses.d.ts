export interface OptionGroupClasses {
    /** Class name applied to the root element. */
    root: string;
    /** State class applied to the root `li` element if `disabled={true}`. */
    disabled: string;
    /** Class name applied to the label element. */
    label: string;
    /** Class name applied to the list element. */
    list: string;
}
export type OptionGroupClassKey = keyof OptionGroupClasses;
export declare function getOptionGroupUtilityClass(slot: string): string;
export declare const optionGroupClasses: OptionGroupClasses;
