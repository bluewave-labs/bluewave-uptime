export interface ButtonClasses {
    /** Class name applied to the root element. */
    root: string;
    /** State class applied to the root `button` element if `active={true}`. */
    active: string;
    /** State class applied to the root `button` element if `disabled={true}`. */
    disabled: string;
    /** State class applied to the root `button` element if `focusVisible={true}`. */
    focusVisible: string;
}
export type ButtonClassKey = keyof ButtonClasses;
export declare function getButtonUtilityClass(slot: string): string;
export declare const buttonClasses: ButtonClasses;
