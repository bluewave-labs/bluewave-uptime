export interface SwitchClasses {
    /** Class applied to the root element. */
    root: string;
    /** Class applied to the internal input element */
    input: string;
    /** Class applied to the track element */
    track: string;
    /** Class applied to the thumb element */
    thumb: string;
    /** State class applied to the root element if the switch is checked */
    checked: string;
    /** State class applied to the root element if the switch is disabled */
    disabled: string;
    /** State class applied to the root element if the switch has visible focus */
    focusVisible: string;
    /** Class applied to the root element if the switch is read-only */
    readOnly: string;
}
export type SwitchClassKey = keyof SwitchClasses;
export declare function getSwitchUtilityClass(slot: string): string;
export declare const switchClasses: SwitchClasses;
