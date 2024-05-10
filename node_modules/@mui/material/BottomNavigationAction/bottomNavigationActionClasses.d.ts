export interface BottomNavigationActionClasses {
    /** Styles applied to the root element. */
    root: string;
    /** State class applied to the root element if selected. */
    selected: string;
    /** State class applied to the root element if `showLabel={false}` and not selected. */
    iconOnly: string;
    /** Styles applied to the label's span element. */
    label: string;
}
export type BottomNavigationActionClassKey = keyof BottomNavigationActionClasses;
export declare function getBottomNavigationActionUtilityClass(slot: string): string;
declare const bottomNavigationActionClasses: BottomNavigationActionClasses;
export default bottomNavigationActionClasses;
