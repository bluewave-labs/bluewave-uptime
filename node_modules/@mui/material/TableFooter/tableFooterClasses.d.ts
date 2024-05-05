export interface TableFooterClasses {
    /** Styles applied to the root element. */
    root: string;
}
export type TableFooterClassKey = keyof TableFooterClasses;
export declare function getTableFooterUtilityClass(slot: string): string;
declare const tableFooterClasses: TableFooterClasses;
export default tableFooterClasses;
