export interface RadioClasses {
    /** Styles applied to the root element. */
    root: string;
    /** State class applied to the root element if `checked={true}`. */
    checked: string;
    /** State class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the root element if `color="primary"`. */
    colorPrimary: string;
    /** Styles applied to the root element if `color="secondary"`. */
    colorSecondary: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall: string;
}
export type RadioClassKey = keyof RadioClasses;
export declare function getRadioUtilityClass(slot: string): string;
declare const radioClasses: RadioClasses;
export default radioClasses;
