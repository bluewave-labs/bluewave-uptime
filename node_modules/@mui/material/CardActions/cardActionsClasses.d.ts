export interface CardActionsClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element unless `disableSpacing={true}`. */
    spacing: string;
}
export type CardActionsClassKey = keyof CardActionsClasses;
export declare function getCardActionsUtilityClass(slot: string): string;
declare const cardActionsClasses: CardActionsClasses;
export default cardActionsClasses;
