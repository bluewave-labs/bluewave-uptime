export interface PaperClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element unless `square={true}`. */
    rounded: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined: string;
    /** Styles applied to the root element if `variant="elevation"`. */
    elevation: string;
    /** Styles applied to the root element if `elevation={0}`. */
    elevation0: string;
    /** Styles applied to the root element if `elevation={1}`. */
    elevation1: string;
    /** Styles applied to the root element if `elevation={2}`. */
    elevation2: string;
    /** Styles applied to the root element if `elevation={3}`. */
    elevation3: string;
    /** Styles applied to the root element if `elevation={4}`. */
    elevation4: string;
    /** Styles applied to the root element if `elevation={5}`. */
    elevation5: string;
    /** Styles applied to the root element if `elevation={6}`. */
    elevation6: string;
    /** Styles applied to the root element if `elevation={7}`. */
    elevation7: string;
    /** Styles applied to the root element if `elevation={8}`. */
    elevation8: string;
    /** Styles applied to the root element if `elevation={9}`. */
    elevation9: string;
    /** Styles applied to the root element if `elevation={10}`. */
    elevation10: string;
    /** Styles applied to the root element if `elevation={11}`. */
    elevation11: string;
    /** Styles applied to the root element if `elevation={12}`. */
    elevation12: string;
    /** Styles applied to the root element if `elevation={13}`. */
    elevation13: string;
    /** Styles applied to the root element if `elevation={14}`. */
    elevation14: string;
    /** Styles applied to the root element if `elevation={15}`. */
    elevation15: string;
    /** Styles applied to the root element if `elevation={16}`. */
    elevation16: string;
    /** Styles applied to the root element if `elevation={17}`. */
    elevation17: string;
    /** Styles applied to the root element if `elevation={18}`. */
    elevation18: string;
    /** Styles applied to the root element if `elevation={19}`. */
    elevation19: string;
    /** Styles applied to the root element if `elevation={20}`. */
    elevation20: string;
    /** Styles applied to the root element if `elevation={21}`. */
    elevation21: string;
    /** Styles applied to the root element if `elevation={22}`. */
    elevation22: string;
    /** Styles applied to the root element if `elevation={23}`. */
    elevation23: string;
    /** Styles applied to the root element if `elevation={24}`. */
    elevation24: string;
}
export type PaperClassKey = keyof PaperClasses;
export declare function getPaperUtilityClass(slot: string): string;
declare const paperClasses: PaperClasses;
export default paperClasses;
