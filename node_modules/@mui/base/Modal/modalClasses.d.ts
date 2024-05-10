export interface ModalClasses {
    /** Class name applied to the root element. */
    root: string;
    /** Class name applied to the root element if the `Modal` has exited. */
    hidden: string;
    /** Class name applied to the backdrop element. */
    backdrop: string;
}
export type ModalClassKey = keyof ModalClasses;
export declare function getModalUtilityClass(slot: string): string;
export declare const modalClasses: ModalClasses;
