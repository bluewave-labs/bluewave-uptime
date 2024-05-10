export interface FormGroupClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `row={true}`. */
    row: string;
    /** State class applied to the root element if `error={true}`. */
    error: string;
}
export type FormGroupClassKey = keyof FormGroupClasses;
export declare function getFormGroupUtilityClass(slot: string): string;
declare const formGroupClasses: FormGroupClasses;
export default formGroupClasses;
