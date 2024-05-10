export interface PopupClasses {
    /** Class name applied to the root element. */
    root: string;
    /** Class name applied to the root element when the popup is open. */
    open: string;
}
export type PopupClassKey = keyof PopupClasses;
export declare function getPopupUtilityClass(slot: string): string;
export declare const popupClasses: PopupClasses;
