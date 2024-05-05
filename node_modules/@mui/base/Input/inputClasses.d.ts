export interface InputClasses {
    /** Class name applied to the root element. */
    root: string;
    /** Class name applied to the root element if the component is a descendant of `FormControl`. */
    formControl: string;
    /** Class name applied to the root element if `startAdornment` is provided. */
    adornedStart: string;
    /** Class name applied to the root element if `endAdornment` is provided. */
    adornedEnd: string;
    /** State class applied to the root element if the component is focused. */
    focused: string;
    /** State class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** State class applied to the root element if `error={true}`. */
    error: string;
    /** Class name applied to the root element if `multiline={true}`. */
    multiline: string;
    /** Class name applied to the input element. */
    input: string;
    /** Class name applied to the input element if `multiline={true}`. */
    inputMultiline: string;
    /** Class name applied to the input element if `type="search"`. */
    inputTypeSearch: string;
}
export type InputClassKey = keyof InputClasses;
export declare function getInputUtilityClass(slot: string): string;
export declare const inputClasses: InputClasses;
