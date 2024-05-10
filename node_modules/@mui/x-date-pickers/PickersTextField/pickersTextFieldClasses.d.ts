export interface PickersTextFieldClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if focused. */
    focused: string;
    /** State class applied to the root element if `disabled=true`. */
    disabled: string;
    /** State class applied to the root element if `error=true`. */
    error: string;
    /** State class applied to the root element id `required=true` */
    required: string;
}
export type PickersTextFieldClassKey = keyof PickersTextFieldClasses;
export declare function getPickersTextFieldUtilityClass(slot: string): string;
export declare const pickersTextFieldClasses: Record<keyof PickersTextFieldClasses, string>;
