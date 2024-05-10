export interface FormControlLabelClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `labelPlacement="start"`. */
    labelPlacementStart: string;
    /** Styles applied to the root element if `labelPlacement="top"`. */
    labelPlacementTop: string;
    /** Styles applied to the root element if `labelPlacement="bottom"`. */
    labelPlacementBottom: string;
    /** State class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the label's Typography component. */
    label: string;
    /** State class applied to the root element if `error={true}`. */
    error: string;
    /** State class applied to the root element if `required={true}`. */
    required: string;
    /** Styles applied to the asterisk element. */
    asterisk: string;
}
export type FormControlLabelClassKey = keyof FormControlLabelClasses;
export declare function getFormControlLabelUtilityClasses(slot: string): string;
declare const formControlLabelClasses: FormControlLabelClasses;
export default formControlLabelClasses;
