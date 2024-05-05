export interface BackdropClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `invisible={true}`. */
    invisible: string;
}
export type BackdropClassKey = keyof BackdropClasses;
export declare function getBackdropUtilityClass(slot: string): string;
declare const backdropClasses: BackdropClasses;
export default backdropClasses;
