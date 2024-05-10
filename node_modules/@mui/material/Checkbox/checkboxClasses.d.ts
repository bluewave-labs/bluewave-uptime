export interface CheckboxClasses {
    /** Class name applied to the root element. */
    root: string;
    /** State class applied to the root element if `checked={true}`. */
    checked: string;
    /** State class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** State class applied to the root element if `indeterminate={true}`. */
    indeterminate: string;
    /** State class applied to the root element if `color="primary"`. */
    colorPrimary: string;
    /** State class applied to the root element if `color="secondary"`. */
    colorSecondary: string;
    /** State class applied to the root element if `size="small"`. */
    sizeSmall: string;
    /** State class applied to the root element if `size="medium"`. */
    sizeMedium: string;
}
export type CheckboxClassKey = keyof CheckboxClasses;
export declare function getCheckboxUtilityClass(slot: string): string;
declare const checkboxClasses: CheckboxClasses;
export default checkboxClasses;
